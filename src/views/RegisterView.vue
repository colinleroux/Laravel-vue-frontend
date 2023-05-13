<template>
  <div>
    <h1 class="text-3xl font-bold mt-5 mb-5 text-center">Register Page</h1>

    <div class="flex justify-center">
      <div class="w-full max-w-sm m-5">
        <div class="bg-white rounded-xl shadow-lg p-6 h-full">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 py-2">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="title"
              >
                Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="name"
                v-model="user.name"
              />
              <p class="text-red-500 text-xs italic">{{ errors.name }}</p>
            </div>

            <div class="w-full px-3 py-2">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="title"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                v-model="user.email"
              />
              <p class="text-red-500 text-xs italic">{{ errors.email }}</p>
            </div>

            <div class="w-full px-3 py-2">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="title"
              >
                Confirm Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                v-model="user.password"
              />
              <p class="text-red-500 text-xs italic">{{ errors.password }}</p>
            </div>

            <div class="w-full px-3 py-2">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="title"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password_confirm"
                type="password"
                v-model="user.password_confirmation"
              />
              <p class="text-red-500 text-xs italic">
                {{ errors.password_confirmation }}
              </p>
            </div>
          </div>

          <div class="w-full px-3 py-2">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="register"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repository from "@/api/repository";

export default {
  name: "RegisterView",
  components: {},

  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      errors: {},
    };
  },
  methods: {
    async register() {
      repository.createSession();
      try {
        const response = await repository.register(this.user);
        repository.setToken(response.data.token);
        this.reloadPage();
        this.$router.push("/testpage");
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors;
        } else {
          this.errors = {
            message: "Registration failed. Please try again later.",
          };
        }
      }
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
