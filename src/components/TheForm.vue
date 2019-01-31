<template>
  <div class="the-form">
    <form method="post" @submit.prevent>
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </form>

    <div class="modal" v-show="model.processing">
      <div class="modal-content">

        <p>{{ model.modalMessage }}</p>

        <div class="form-group valid field-submit">
          <div class="field-wrap">
            <input type="submit" @click="hideModal" value="Noted">
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
import axios from 'axios'
import 'vue-form-generator/dist/vfg.css'

Vue.use(VueFormGenerator)

export default {
  data () {
    return {
      model: {
        quoted: '223.50',
        ern_exempt: false,
        processing: false,
        modalMessage: 'Submitting your quote, please wait...'
      },
      schema: {
        groups: [
          {
            legend: 'Your Details',
            fields: [
              {
                type: 'select',
                label: 'Title',
                model: 'title',
                values: ['Mr', 'Mrs', 'Ms', 'Dr'],
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'First name',
                model: 'first_name',
                placeholder: 'John',
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Last name',
                model: 'last_name',
                placeholder: 'Smith',
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string
              }
            ]
          },
          {
            legend: 'Your business',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Employee ERN',
                model: 'ern',
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string,
                visible(model) {
                  return !model.ern_exempt
                }
              },
              {
                type: 'switch',
                label: 'We are either exempt from having an ERN or we can provide it within 30 days.',
                model: 'ern_exempt',
                multi: true,
                readonly: false,
                disabled: false,
                textOn: 'Yes',
                textOff: 'No'
              },
              {
                type: 'textArea',
                inputType: 'text',
                label: 'Premises address',
                model: 'address',
                featured: true,
                validator: VueFormGenerator.validators.string
              }
            ]
          },
          {
            legend: 'Your policy',
            fields: [
              {
                type: 'input',
                inputType: 'date',
                name: 'policy_start_date',
                format: 'YYYY-MM-DD',
                label: 'Policy start date',
                model: 'policy_start_date',
                featured: true,
                required: true,
                validator: VueFormGenerator.validators.string
              }
            ]
          },
          {
            legend: 'Your account',
            fields: [
              {
                type: 'input',
                inputType: 'email',
                label: 'E-mail',
                featured: true,
                required: true,
                model: 'email',
                placeholder: 'E-mail address',
                validator: VueFormGenerator.validators.email
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Account password',
                model: 'password',
                required: true,
                featured: true,
                min: 6,
                hint: 'Minimum 6 characters',
                validator: VueFormGenerator.validators.string
              },
              {
              type: 'input',
              inputType: 'password',
              label: 'Confirm account password',
              model: 'password_confirmation',
              min: 6,
              required: true,
              featured: true,
              hint: 'Minimum 6 characters',
              validator: [
                VueFormGenerator.validators.string,
                  (value, field, model) => {
                    let pass = model.password;
                    let confPass = value;
                    if (pass != confPass) {
                      return ["Passwords don't match."];
                    } else {
                      return [];
                    }
                  }
                ]
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Total premium',
                hint: 'per month. 0% APR, tax included',
                model: 'quoted',
                readonly: true,
                featured: true,
                disabled: true
              },
              {
                type: 'submit',
                buttonText: 'Confirm ❯',
                onSubmit: this.postForm,
                validateBeforeSubmit: true
              }
            ]
          }
        ],
      },
      formOptions: {
        validateAfterChanged: true,
        validateAsync: true,
        validateDebounceTime: 500
      }
    }
  },
  created() {
    axios.interceptors.request.use((config) => {
      // Showing modal with message
      this.showModal()
      return config
    }, (error) => {

      // Hiding modal with message
      this.hideModal()
      return Promise.reject(error)
    });

    axios.interceptors.response.use((response) => {
      // Hiding modal with message
      this.showModal()
      return response
    }, (error) => {
      // Showing modal with message
      this.showModal()
      return Promise.reject(error)
    });
  },
  methods: {
    postForm() {
      axios.post('http://httpbin.org/post',
      this.model,
      { headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // console.log('response: ', JSON.stringify(response, null, 2))
        this.model.modalMessage = 'Your reference is: ' + response.data.origin // IP address, just so that we have a ref
      })
      .catch(error => {
          console.log(error.response.data)
      });
    },
    showModal() {
      this.model.processing = true
    },
    hideModal() {
      this.model.processing = false
      this.$router.replace('/success')
    }
  }
}
</script>

<style lang='scss'>
$alabaster: #fafafa;
$black: #000000;
$grey: #888888;
$greyIsh: #7e7e7e;
$mysin: #FFB530;
$silverChalice: #aaaaaa;
$steelBlue: #488CBE;
$white: #ffffff;

.the-form {
  min-width: 400px;
  width: 50vw;
  margin-top: 40px;

  form {
    background-color: $alabaster;
    padding: 10px 0;
  }

  fieldset {
    position: relative;
    margin: 12px 0 0;
    border: none;

    legend {
      text-align: left;
      display: block;
      margin-bottom: 10px;
      color: $greyIsh;
    }
  }
  input,
  select {
    height: 40px;
  }

  label {
    text-align: left;
    display: block;
    margin-bottom: 5px;
  }

  textarea {
    min-height: 150px;
  }

  input[type=date]::-webkit-inner-spin-button { 
    display: none;
  }

  input[type=date] {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    appearance: none;
    -webkit-appearance: none;
    display: inline-block !important;
    visibility: visible !important;
  }

  .disabled {
    margin-top: 30px;
    background-color: $steelBlue;
    padding: 10px;
    color: $white;

    label {
      color: $white;
      font-style: normal;
    }

    input[type=text] {
      border: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border-radius: 0;
      color: $white;
      -webkit-text-fill-color:$white;
      -webkit-opacity: 1;
      opacity: 1;
      background-color: $steelBlue;
      font-size: 34px;
      line-height: 38px;
      font-weight: bolder;
      padding-left: 20px;
    }

    .wrapper {
      position: relative;
   
      &:before {
        position: absolute;
        left: 0;
        top: 3px;
        display: inline-block;
        font-size: 34px;
        line-height: 38px;
        font-weight: bold;
        content: '\00A3';
      }   
    }

    .hint {
      font-style: normal;
      text-align: left;
    }
  }

  .field-submit {
    position: absolute;
    display: block;
    bottom: 58px;
    right: 20px;
    width: auto;
    float: none;
    margin: 0;

    input[type=submit] {
      padding: 0 30px;
      font-weight: bold;
      font-size: 16px;
      color: $white!important;
      background-color: $mysin!important;
      border-color: $mysin!important;
      text-shadow: 2px 2px 2px rgba(52, 52, 53, 0.25);
    }
  }

  .help-block {
    text-align: left;

    &.errors {
      animation: slide-down 0.5s ease;
    }
  }

  // Modal
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    position: relative;
    background-color: $alabaster;
    margin: calc(50vh - 100px) auto;
    padding: 20px 20px 60px;
    border: 1px solid $grey;
    width: 80%;
    animation: slide-down 0.5s ease;

    .field-submit {
      right: calc(50% - 55px);
      bottom: 20px;
    }
  }

  /* The Close Button */
  .close {
    color: $silverChalice;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: $black;
    text-decoration: none;
    cursor: pointer;
  }

  @keyframes slide-down {
    0% {
        opacity: 0;
        transform: translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }
}
</style>
