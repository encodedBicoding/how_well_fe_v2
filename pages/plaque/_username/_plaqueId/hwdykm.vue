<template>
  <div class="plaquePage">
    <div class="container">
      <div class="page-content head">
        <div class="header flex-row justify-space-between">
          <div class="page-logo">
            <a href="/dashboard">HWDYKM <span class="beta">QUIZ</span></a>
          </div>
          <div class="share">
            <div>
              <font-awesome-icon
                :icon="['fas', 'share-alt']"
                class="white share-ic"
                size="lg"
              />
            </div>
            <div class="shareC">
              <div class="share_container">
                <p class="shareT">Share</p>
                <div class="socialIcon">
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u=https://hwdykm.xyz"
                    target="_blank"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'facebook-f']"
                      class="white"
                      size="lg"
                    />
                  </a>
                </div>
                <div class="socialIcon">
                  <a
                    href="https://twitter.com/share?url=https://hwdykm.xyz"
                    target="_blank"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'twitter']"
                      class="white"
                      size="lg"
                    />
                  </a>
                </div>
                <div class="socialIcon">
                  <a
                    href="https://www.linkedin.com/shareArticle?mini=true&url=https://hwdykm.xyz"
                    target="_blank"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'linkedin-in']"
                      class="white"
                      size="lg"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        v-if="this.$route.params.username === currentUsername"
        class="page-body body-flex dash "
        :href="`${frontendUrl}/dashboard`"
      >
        VIEW DASHBOARD
      </a>
      <div class="body">
        <div
          v-if="this.$route.params.username === currentUsername"
          class="page-body-remix"
        >
          <div v-if="plaqueData.hasOwnProperty('name')">
            <div class="plaque-header flex-row justify-space-between">
              <div class="flex-row justify-space-between pph">
                <h3 class="plaqueName">{{ plaqueData.name }}</h3>
                <p class="queCount">
                  {{ plaqueData.Questions.length }}
                  <span class="queCount">
                    {{
                      plaqueData.Questions.length > 1 ? 'questions' : 'question'
                    }}
                    <span>
                      {{
                        plaqueData.Questions.length >= 15 ? '(completed)' : ''
                      }}
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div v-if="plaqueData.Questions.length <= 0">
              <div class="ppqueContainer">
                <p class="noQueP">
                  This Plaque ({{ plaqueData.name }}) currently doesn't have any
                  questions. Go to your dashboard to add some questions to the
                  plaque
                </p>
                <!-- hwdykm -->
                <ins
                  class="adsbygoogle"
                  style="display:block"
                  data-ad-client="ca-pub-6604666533289792"
                  data-ad-slot="5781116894"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                >
                </ins>
              </div>
            </div>
            <!-- hwdykm -->
            <ins
              class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-6604666533289792"
              data-ad-slot="5781116894"
              data-ad-format="auto"
              data-full-width-responsive="true"
            >
            </ins>
            <div v-if="plaqueData.Questions.length > 0">
              <div class="ppqueContainer">
                <div
                  v-for="question in plaqueData.Questions"
                  :key="question.id"
                  class="queHolder"
                >
                  <div class="queListing">
                    <div class="queTitle flex-row justify-space-between">
                      <div class="flex-row justify-space-between qr">
                        <p id="questionT">{{ question.question }}</p>
                        <p class="resCount">
                          {{ question.Responses.length }}
                          <span class="resCount">
                            {{
                              question.Responses.length > 1
                                ? 'responses'
                                : 'response'
                            }}
                          </span>
                        </p>
                      </div>
                      <div
                        class="showQ"
                        @click="() => toggleResponse(question.id)"
                      >
                        <div>
                          <div v-if="showResponse !== question.id">
                            <font-awesome-icon
                              :icon="['fas', 'caret-down']"
                              class="black"
                              size="lg"
                            />
                          </div>
                          <div v-if="showResponse === question.id">
                            <font-awesome-icon
                              :icon="['fas', 'caret-up']"
                              class="black"
                              size="lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="showResponse === question.id"
                      class="ownerAnswer"
                    >
                      <span class="bold-text">Your Answer: </span>
                      <span>{{ question.answer }}</span>
                    </div>
                    <div
                      v-for="response in question.Responses"
                      :key="response.id"
                      :class="
                        showResponse === question.id
                          ? 'responseHolder'
                          : 'hideRes'
                      "
                    >
                      <div class="resAuthor">
                        <div v-html="response.author"></div>
                      </div>
                      <div class="resComment">
                        <span><b>Response</b>: </span>
                        <span>{{ response.response }}</span>
                        <span 
                          v-if="response.responseStatus !== 'not_applicable'"
                          :class="response.responseStatus === 'correct' ? 'response_icon pass' : 'response_icon no-pass'"
                          ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!plaqueData.hasOwnProperty('name')">
            <div class="no-p-fl">
              <div v-if="!loadingSinglePlaque" class="np-content">
                <p>NO PLAQUE HERE</p>
              </div>
              <div class="plaqueLoading">
                <p v-if="loadingSinglePlaque">
                  Loading plaque data. Please wait...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.$route.params.username !== currentUsername"
          class="page-body-remix"
        >
          <div
            v-if="
              plaqueData.hasOwnProperty('name') &&
                hasQuestions &&
                !skippedDataSharing
            "
          >
            <div class="annoymous-intro">
              <p>
                Please fill the form below to take this Quiz
              </p>
              <p>or <b class="white">SKIP</b> to remain anonymous</p>
            </div>
            <div class="resFormContainer">
              <form class="resForm">
                <div class="resFormData">
                  <label for="name">Name: <span class="red">*</span></label>
                  <input v-model="resName" type="text" name="name" />
                </div>
                <div class="resFormAction">
                  <div class="formCAction" @click="(e) => skipForm(e)">
                    <div class="formSkip">
                      <p>SKIP</p>
                    </div>
                  </div>
                  <div class="formCAction" @click="(e) => continueForm(e)">
                    <div class="formContinue">
                      <p>CONTINUE</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            v-if="
              plaqueData.hasOwnProperty('name') &&
                hasQuestions &&
                skippedDataSharing
            "
          >
            <div class="annoymous-intro"></div>
            <!-- hwdykm -->
            <ins
              class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-6604666533289792"
              data-ad-slot="5781116894"
              data-ad-format="auto"
              data-full-width-responsive="true"
            >
            </ins>
            <div class="queToAnswer">
              <div
                :class="
                  !currentQuestion
                    ? 'queToAnswerBody'
                    : 'queToAnswerBody slideIn'
                "
              >
                <div
                  v-if="typeof currentQuestion === 'number'"
                  class="queToAnswerContent"
                >
                  <p class="bold-text">
                    Question {{ currentQuestion + 1 }}
                    <span class="thin-text">
                      - out of {{ plaqueData.Questions.length }}
                    </span>
                    <span class="thin-text">
                      {{
                        plaqueData.Questions.length > 1
                          ? 'questions'
                          : 'question'
                      }}
                    </span>
                  </p>
                  <div class="qta">
                    <p class="plaqueQ">
                      {{ plaqueData.Questions[currentQuestion].question }}
                    </p>
                    <div
                      v-if="
                        showAnswer &&
                          plaqueData.Questions[currentQuestion].showAnswer
                      "
                    >
                      <p
                        :class="
                          isResponseCorrect(
                            responseAnswer,
                            plaqueData.Questions[currentQuestion].answer,
                            plaqueData.Questions[currentQuestion].options.length
                          )
                            ? 'correct answer'
                            : 'fail answer'
                        "
                      >
                        {{ plaqueData.Questions[currentQuestion].answer }}
                      </p>
                    </div>
                    <div class="yreply-container">
                      <form
                        id="response_form"
                        method="post"
                        class="yreplyForm"
                        name="response_form"
                        @submit="
                          (e) =>
                            submitResponse(
                              e,
                              plaqueData.Questions[currentQuestion].id
                            )
                        "
                      >
                        <div
                          v-if="
                            plaqueData.Questions[currentQuestion].options
                              .length <= 0 ||
                              plaqueData.Questions[currentQuestion]
                                .options[0] === ''
                          "
                        >
                          <input
                            v-model="responseAnswer"
                            type="text"
                            name="response"
                            placeholder="Your answer?"
                            class="txtarea"
                          />
                        </div>
                        <div
                          v-if="
                            plaqueData.Questions[currentQuestion].options
                              .length > 0 &&
                              plaqueData.Questions[currentQuestion]
                                .options[0] !== ''
                          "
                        >
                          <div
                            v-for="(opt, idx) in plaqueData.Questions[
                              currentQuestion
                            ].options"
                            :key="idx"
                            class="resIC"
                          >
                            <input
                              :id="opt"
                              v-model="responseAnswer"
                              name="response"
                              type="radio"
                              :value="opt"
                              :placeholder="opt"
                            />
                            <label :for="opt" class="resLabel capitalize">{{
                              opt
                            }}</label>
                          </div>
                        </div>
                        <div class="yreplybtn">
                          <p v-if="submittingResponse" class="text-center">
                            RESPONDING...
                          </p>
                          <button v-if="!submittingResponse">SUBMIT</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div v-if="typeof currentQuestion === 'string'">
                  <div>
                    <p class="thankyou">
                      Thank you for your response!
                    </p>
                    <div class="margin-top-1rem">
                      <p>
                        Be like
                        <span class="bold-text">
                          {{ this.$route.params.username.toUpperCase() }},
                        </span>
                        click
                        <a :href="frontendUrl + '/begin'" class="bold-text here">HERE</a>
                        to create your account!
                      </p>
                      <!-- hwdykm -->
                      <ins
                        class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6604666533289792"
                        data-ad-slot="5781116894"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      >
                      </ins>
                      <br />
                      <p>
                        Already have an account?
                        <button class="lgn" @click="() => login()">
                          Login
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="currentQuestion === null" class="flex-center">
                  <div class="loader">
                    <img
                      src="~assets/images/loader.gif"
                      alt="load anonymous messages"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!loadingSinglePlaque">
            <div v-if="!plaqueData.hasOwnProperty('name') || !hasQuestions">
            <div class="no-p-fl">
              <div v-if="!loadingSinglePlaque" class="np-content">
                <p>NO QUESTIONS IN PLAQUE</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="footer">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
></script>
<script>
;(adsbygoogle = window.adsbygoogle || []).push({})
</script>

<script>
import $ from 'jquery'
import Footer from '~/components/Footer.vue'
import FE_URL from '~/helpers/feUrl'

const BASE_URL = process.env.SERVER_API

export default {
  name: 'Plaque',
  components: { Footer },
  head() {
    return {
      title: 'Plaques',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${
            this.$route.params.username === this.currentUsername
              ? 'Welcome to your plaques page, Read all your anonymous responses and answers to your online quiz questions'
              : 'Respond to questions from your friends and family, answer online quiz questions. You can choose to send anonymous responses or not'
          }`
        }
      ]
    }
  },
  methods: {
    isResponseCorrect(friendR, quesA, optLen) {
      let friendResponse = friendR.toLowerCase().trim()
      const questionAnswer = quesA.toLowerCase()
      let correct = false
      if (optLen <= 0) {
        for (let i = 0; i <= friendResponse.length; i += 1) {
          if (friendResponse[i] === ' ') {
            friendResponse = friendResponse.split(' ')
            break
          }
        }
        if (typeof friendResponse === 'string') {
          if (questionAnswer.match(friendResponse) !== null) {
            correct = true
            return correct
          }
          return correct
        }
        for (let i = 0; i < friendResponse.length; i += 1) {
          if (questionAnswer.match(friendResponse[i]) !== null) {
            correct = true
            break
          }
        }
        return correct
      } else {
        if (questionAnswer === friendResponse) {
          correct = true
        }
        return correct
      }
    },
    skipForm(e) {
      e.preventDefault()
      this.skippedDataSharing = true
    },
    continueForm(e) {
      e.preventDefault()
      if (!this.resName) {
        return
      }
      const author = {}
      author.name = this.resName
      sessionStorage.setItem('__author__', JSON.stringify(author))
      this.skippedDataSharing = true
    },
    login() {
      return this.$router.push({
        name: 'begin',
        params: { haveAccountAlready: true }
      })
    },
    validateUserRoute() {
      const userParam = this.$route.params.username
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/check/${userParam}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            '__token__HWDYKM__user__'
          )}`
        },
        contentType: 'application/json',
        error() {
          window.location.href = `${FE_URL}/user/${userParam}/NotFound`
        }
      }).then()
    },
    toggleResponse(id) {
      this.showResponse = this.showResponse === id ? 0 : id
    },
    getCurrentUser() {
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/user/profile`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            '__token__HWDYKM__user__'
          )}`
        },
        contentType: 'application/json',
        error() {
          this.$router.push({
            name: 'begin',
            params: { haveAccountAlready: true }
          })
        }
      }).then((res) => {
        this.currentUsername = res.data.userName
      })
    },
    getSinglePlaque() {
      this.loadingSinglePlaque = true
      $.ajax({
        type: 'GET',
        url: `${BASE_URL}/plaque/${this.$route.params.plaqueId}`,
        contentType: 'application/json',
        error: (res) => {
          this.loadingSinglePlaque = false
          this.$router.push({
            name: 'begin',
            params: { haveAccountAlready: true }
          })
          this.loadingSinglePlaque = false
        },
      }).then((res) => {
        this.plaqueData = { ...res.data }
        if (this.plaqueData.Questions.length > 0) {
          this.hasQuestions = true
        }
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
        this.loadingSinglePlaque = false
      })
    },
    submitResponse(e, id) {
      if(this.submittingResponse) return;
      e.preventDefault()
      if (!this.responseAnswer) {
        return
      }
      this.submittingResponse = true
      let formData = $('#response_form').serializeArray()
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value.trim()
        return acc
      }, {})
      if(!this.skippedDataSharing) {
        if (sessionStorage.getItem('__author__')) {
        const respondingUser = JSON.parse(sessionStorage.getItem('__author__'))
        formData.name = respondingUser.name
        formData.school = respondingUser.school
        formData.classInSchool = respondingUser.class
        formData.country = respondingUser.country
        formData.teacherName = respondingUser.teacherName
      }
      } else {
        formData.responseId = this.responseId
      }
      let prevCount = ''
      this.showAnswer = true
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/new/response/${id}`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        error: (res) => {
          this.submittingResponse = false;
        }
      }).then((res) => {
        if(res.responseId && this.skippedDataSharing) {
          this.responseId = res.responseId
        }
        if (this.currentQuestion + 1 === this.plaqueData.Questions.length) {
          setTimeout(() => {
            this.currentQuestion = null
            this.submittingResponse = false
          }, 1300)
          setTimeout(() => {
            this.currentQuestion = 'finished'
            this.submittingResponse = false
          }, 2500)
        } else {
          prevCount = this.currentQuestion
          setTimeout(() => {
            this.currentQuestion = null
            this.submittingResponse = false
          }, 2200)
        }
        setTimeout(() => {
          this.showAnswer = false
          this.responseAnswer = ''
          this.currentQuestion = prevCount + 1
          this.submittingResponse = false
        }, 2500)
      })
    }
  },

  beforeMount() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
  },

  async mounted() {
    this.validateUserRoute()
    if (sessionStorage.getItem('__token__HWDYKM__user__')) {
      await this.getCurrentUser()
    }
    await this.getSinglePlaque()
  },
  data() {
    return {
      skippedDataSharing: false,
      currentUsername: '',
      showResponse: 0,
      frontendUrl: FE_URL,
      showAnswer: false,
      repliedData: [],
      currentQuestion: 0,
      hasQuestions: false,
      plaqueData: {},
      responseAnswer: '',
      submittingResponse: false,
      loadingSinglePlaque: true,
      resName: '',
      resSchool: '',
      resClass: '',
      resTeacherName: '',
      resCountry: '',
      responseId: null,
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('@/assets/css/global.scss');
@import url('@/assets/css/dashboard.scss');
@import url('@/assets/css/plaquePage.scss');
@import url('@/assets/css/plaque.scss');
</style>
