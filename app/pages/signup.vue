<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Sign up",
  description: "Create an account to get started",
});

const supabase = useSupabaseClient();
const toast = useToast();

const fields = [
  {
    name: "name",
    type: "text" as const,
    label: "Name",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    type: "text" as const,
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Enter your password",
  },
];

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: () => {
      toast.add({ title: "Google", description: "Login with Google" });
    },
  },
  {
    label: "Apple",
    icon: "i-simple-icons-apple",
    onClick: () => {
      toast.add({ title: "GitHub", description: "Login with GitHub" });
    },
  },
];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: payload.data.email,
      password: payload.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    });
    if (error) {
      toast.add({ title: "Error", description: error.message });
    } else if (data.user && !data.session) {
      // User signed up but needs email confirmation
      toast.add({
        title: "Check your email",
        description: "We sent you a confirmation link to verify your account",
      });
      // Optionally redirect to a "check email" page
      await navigateTo("/confirm");
    } else if (data.session) {
      // User is already confirmed and has a session
      await navigateTo("/dashboard");
    }
  } catch (err) {
    toast.add({ title: "Error", description: "An unexpected error occurred" });
  }
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    title="Create an account"
    :submit="{ label: 'Create account' }"
    @submit="onSubmit"
  >
    <template #description>
      Already have an account?
      <ULink to="/login" class="text-primary font-medium">Login</ULink>.
    </template>

    <template #footer>
      By signing up, you agree to our
      <ULink to="/" class="text-primary font-medium">Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>
