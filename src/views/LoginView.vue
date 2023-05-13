<template>
  <div>
    <h1 class="text-3xl font-bold mt-5 mb-5 text-center">Login Page</h1>

    <div class="flex justify-center">
      <div class="w-full max-w-sm m-5">
        <div class="bg-white rounded-xl shadow-lg p-6 h-full">
          <div class="flex flex-wrap -mx-3 mb-6">
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
                id="password"
                type="password"
                v-model="user.password"
                @keyup.enter="login"
              />
            </div>

            <div class="w-full px-3 py-2">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                @click="login"
              >
                Login
              </button>
              <p class="text-red-500">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repository from "@/api/repository";

export default {
  name: "LoginView",
  components: {},

  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      errorMessage: null,
    };
  },
  mounted() {
    this.user.password = "";
  },

  methods: {
    // Login and store token in localStorage
    async login() {
      repository.createSession();
      try {
        const response = await repository.login(this.user);
        console.log(response);
        repository.setToken(response.data.token);
        this.reloadPage();
        this.$router.push("/testpage");
        this.errorMessage = null;
      } catch (error) {
        console.error(error);
        this.errorMessage =
          "Login failed. Please check your email and password.";
      }
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
