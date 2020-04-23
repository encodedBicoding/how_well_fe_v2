<template>
  <div class="plaque">
    <div class="plaque-header flex-row justify-space-between">
      <div class="flex-row justify-space-between ph">
        <h3 class="plaqueName">{{ plaqueName }}</h3>
        <p class="queCount">
          {{ questions.length }}
          <span class="queCount">
            {{ questions.length > 1 ? 'questions' : 'question' }}
          </span>
        </p>
      </div>
      <p class="completed queCount">
        {{ questions.length >= 15 ? 'completed' : '' }}
      </p>
      <div class="addQue" @click="() => showPlaque(plaqueId, questions.length)">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          :class="questions.length >= 15 ? 'greyDisabled' : 'white'"
          size="lg"
        />
      </div>
    </div>
    <a class="plaque-flex directPlaque borderBTM" :href="singlePlaqueLink">
      <p class="vpt">
        View plaque details
      </p>
    </a>
    <div class="plaque-flex">
      <div class="delQ">
        <div>
          <font-awesome-icon
            :icon="['fas', 'trash']"
            class="red link-hover"
            size="1x"
            @click="() => showDeletePlaqueModal()"
          />
        </div>
      </div>
      <div class="linkQ">
        <div title="copy plaque link" class="link-flex">
          <button class="cpTxt" @click="() => copyLink(plaqueUrl)">
            Copy link
          </button>
          <font-awesome-icon
            :icon="['fas', 'link']"
            class="CLF5 link-hover"
            size="lg"
            @click="() => copyLink(plaqueUrl)"
          />
          <div :class="copy ? 'copied' : 'copied display-none'">
            <p>plaque link copied</p>
            <input
              class="plaqueLink"
              style="display: none; position: absolute; left: -9999px"
              :value="plaqueUrl"
            />
          </div>
        </div>
      </div>
      <div class="showQ" @click="() => toggleQuestions(plaqueId)">
        <div>
          <div v-if="showQuestion !== plaqueId">
            <font-awesome-icon
              :icon="['fas', 'caret-down']"
              class="white"
              size="lg"
            />
          </div>
          <div v-if="showQuestion === plaqueId">
            <font-awesome-icon
              :icon="['fas', 'caret-up']"
              class="white"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div :class="showQuestion === plaqueId ? 'queContainer ' : 'hideQue'">
        <div class="queHolder">
          <div v-if="questions.length > 0">
            <div
              v-for="question in questions"
              :key="question.id"
              class="queListing"
            >
              <div class="quesActionsC">
                <div class="quesActionB">
                  <div class="col-md-2">
                    <div
                      class="quesActionB"
                      @click="
                        () =>
                          showEditPlaqueQuestionModal(
                            question.id,
                            question.question,
                            question.answer,
                            question.options
                          )
                      "
                    >
                      <font-awesome-icon
                        :icon="['fas', 'edit']"
                        class="black"
                        size="xs"
                      />
                      <p>Edit</p>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div
                      class="quesActionB"
                      @click="
                        () =>
                          showDeletePlaqueQuestion(
                            question.id,
                            question.plaqueId
                          )
                      "
                    >
                      <font-awesome-icon
                        :icon="['fas', 'trash']"
                        class="red"
                        size="xs"
                      />
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="queTitle flex-row justify-space-between">
                <div class="flex-row justify-space-between qr">
                  <p id="questionT">{{ question.question }}</p>
                  <p class="resCount">
                    {{ question.Responses.length }}
                    <span class="resCount">
                      {{
                        question.Responses.length > 1 ? 'responses' : 'response'
                      }}
                    </span>
                  </p>
                </div>
                <div class="showQ" @click="() => toggleResponse(question.id)">
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
                v-for="response in question.Responses"
                :key="response.id"
                :class="
                  showResponse === question.id ? 'responseHolder' : 'hideRes'
                "
              >
                <div class="resAuthor">
                  <div v-html="response.author"></div>
                </div>
                <div class="resComment">
                  <span><b>Response</b>: </span>
                  <span>{{ response.response }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="questions.length <= 0" class="flex-center">
            <div class="noQue">
              <p>This plaque currently has no questions</p>
              <p>Click + to add questions to plaque</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FE_URL from '../helpers/feUrl'

export default {
  name: 'Plaque',
  props: {
    plaqueName: {
      type: String,
      required: true
    },
    questions: {
      type: Array,
      required: true
    },
    plaqueId: {
      type: Number,
      required: true
    },
    plaqueUrl: {
      type: String,
      required: true
    },
    showPlaque: {
      type: Function,
      required: true
    },
    showDeletePlaqueModal: {
      type: Function,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    showEditPlaqueQuestionModal: {
      type: Function,
      required: true
    },
    showDeletePlaqueQuestion: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      showQuestion: this.plaqueId,
      showResponse: 0,
      copy: false,
      singlePlaqueLink: ''
    }
  },
  mounted() {
    this.singlePlaqueLink = `${FE_URL}/plaque/${this.username ||
      localStorage.getItem('__user__')}/${this.plaqueId}/hwdykm`
  },
  methods: {
    toggleQuestions(id) {
      this.sq = id
      this.showQuestion = this.showQuestion === id ? 0 : id
    },
    toggleResponse(id) {
      this.showResponse = this.showResponse === id ? 0 : id
    },
    copyLink(link) {
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const ta = document.createElement('textarea')
        ta.readOnly = true
        ta.contentEditable = true
        ta.value = link
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        const range = document.createRange()
        range.selectNodeContents(ta)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
        ta.setSelectionRange(0, 999999)
        document.execCommand('copy')
        document.body.removeChild(ta)
        this.copy = true
      } else {
        const el = document.createElement('textarea')
        el.value = link
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.setAttribute('readonly', '')
        const selected =
          document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        if (selected) {
          document.getSelection().removeAllRanges()
          document.getSelection().addRange(selected)
        }
        this.copy = true
      }
      setTimeout(() => {
        this.copy = false
      }, 700)
      return true
    }
  }
}
</script>
<style lang="scss">
@import url('../assets/css/global.scss');
@import url('../assets/css/plaque.scss');
</style>
