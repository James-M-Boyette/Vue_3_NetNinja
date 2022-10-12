<template>
  <!-- Literally, "on the vanilla HTML 'submit' action (?which occurs any time a button is clicked within a form?), prevent the default behavior (refreshing of page, etc.) of the form" -->
  <form @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input type="email" required v-model="userEmail" />

    <label>Password:</label>
    <input type="password" required v-model="userPassword" />
    <div v-if="passwordError" class="password-error">{{ passwordError }}</div>

    <br />
    <!-- Multiple Checkboxes -->
    <label>Skills (check all that apply):</label>
    <div>
      <input type="checkbox" value="HTML & CSS" v-model="skills" />
      <label>HTML & CSS</label>
    </div>
    <div>
      <input type="checkbox" value="JavaScript" v-model="skills" />
      <label>JavaScript</label>
    </div>
    <div>
      <input type="checkbox" value="Python" v-model="skills" />
      <label>Python</label>
    </div>
    <div>
      <input type="checkbox" value="C++" v-model="skills" />
      <label>C++</label>
    </div>

    <br />

    <!-- Drop-down Menu / "Select Boxes" -->
    <label>Desired Role:</label>
    <select v-model="userRole">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <br />

    <!--  -->
    <label>Additional Interests:</label>
    <div class="extraInstructions">
      (Hit `Enter` or `,` to add your interest to the list ... )
    </div>
    <input type="text" v-model="tempInterest" @keyup="addInterest" />
    <div class="extraInstructions">
      (To delete an entry, `ctrl` + left-click it in the list below ... )
    </div>
    <!-- My Way ... -->
    <!-- <div
      v-for="interest in userInterests"
      v-bind:key="interest"
      class="pill"
      @click="deleteInterest"
    >
      {{ interest }}
    </div> -->

    <!-- Shaun's way ... -->
    <div v-for="interest in userInterests" v-bind:key="interest" class="pill">
      <span @click="deleteInterest(interest)">{{ interest }}</span>
    </div>

    <br />
    <!-- Single Checkbox -->
    <div class="terms">
      <input type="checkbox" required v-model="consent" />
      <label>Accept terms and conditions</label>
    </div>

    <div class="submit">
      <button>Create an Account !</button>
    </div>
  </form>

  <p>Email: {{ userEmail }}</p>
  <p>Password: {{ userPassword }}</p>
  <p>Role: {{ userRole }}</p>
  <p>Terms accepted: {{ consent }}</p>
  <p>Skills: {{ skills }}</p>
  <p>Interests: {{ tempInterest }}, {{ userInterests }}</p>
</template>

<script>
export default {
  data() {
    return {
      // Note: if you turned-on the first two data props below, then the email & password fields would be pre-populated with them - demonstrating the second-half of two-way data binding. `userRole` has therefore been set to something in advance in order to demonstrate this two-way binding perpetually.
      // userEmail: "you@your-email.com",
      // userPassword: "yourPassword"

      userEmail: "",
      userPassword: "",
      userRole: "developer",
      consent: false,

      // Note: when using multiple check boxes, boolean values wont theoretically work (because you can be selecting multiple options as 'true') - so you will need to store all selected/checked box's values in an array
      skills: [],

      tempInterest: "",
      userInterests: [],

      passwordError: "",
    };
  },
  methods: {
    addInterest(e) {
      // Make sure the user has already inputted *something* (not just a comma or the 'enter' key) to the field && they've just hit either the 'enter' or comma keys
      if (this.tempInterest && (e.key === "Enter" || e.key === ",")) {
        // Also, make sure the interest is unique/doesn't already exist in our list
        if (!this.userInterests.includes(this.tempInterest)) {
          this.userInterests.push(this.tempInterest);
        }
        this.tempInterest = "";
      }
    },
    // My Way ...
    // deleteInterest(e) {
    //   if (e.type === "click" && e.ctrlKey) {
    //     this.userInterests = this.userInterests.filter(
    //       (element) => element !== e.target.innerHTML
    //     );
    //   }
    // },

    // Shaun's way ...
    deleteInterest(interest) {
      this.userInterests = this.userInterests.filter((item) => {
        return interest !== item;
      });
    },
    handleSubmit() {
      // Validate Password
      this.passwordError =
        this.passwordError.length > 5
          ? ""
          : "Password must be at least 6 chars long";
      if (!this.passwordError) {
        console.log("email: ", this.userEmail);
        console.log("password: ", this.userPassword);
        console.log("role: ", this.userRole);
        console.log("skills: ", this.skills);
        console.log("interests: ", this.userInterests);
        console.log("terms accepted: ", this.consent);
      }
      console.log("Form submitted");
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

label + .extraInstructions {
  color: #aaa;
  display: block;
  margin: 0px 0 15px;
  font-size: 0.6em;
  letter-spacing: 1px;
  font-weight: bold;
}

.extraInstructions {
  color: #aaa;
  display: block;
  margin: 15px 0 15px;
  font-size: 0.6em;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.password-error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

#skills {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0 10px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

.submit {
  text-align: center;
}
</style>
