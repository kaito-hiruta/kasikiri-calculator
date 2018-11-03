<template>
  <v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">参加者情報編集</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="名前を入力してください"
                type="text"
                :rules="[rules.required]"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="pass"
                label="編集パスワードを入力してください"
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :type="show ? 'text' : 'password'"
                hint="正しいパスワードが入ってるときだけ削除/保存ができます"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                :return-value.sync="startTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="startTime"
                  :rules="[rules.required, rules.inKasikiriStart]"
                  label="開始時刻を選んでください"
                  prepend-icon="access_time"
                  readonly
                  required
                ></v-text-field>
                <v-time-picker
                  v-if="menu1"
                  v-model="startTime"
                  format="24hr"
                  :allowed-minutes="allowedMinutes"
                  full-width
                  @change="$refs.menu1.save(startTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="endTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="endTime"
                  :rules="[rules.required, rules.endTime, rules.inKasikiriEnd]"
                  label="終了時刻を選んでください"
                  prepend-icon="access_time"
                  readonly
                  required
                ></v-text-field>
                <v-time-picker
                  v-if="menu2"
                  :allowed-minutes="allowedMinutes"
                  v-model="endTime"
                  format="24hr"
                  full-width
                  @change="$refs.menu2.save(endTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat @click.native="onClickDelete()">削除</v-btn>
        <v-btn color="blue darken-1" flat @click.native="close()">閉じる</v-btn>
        <v-btn color="blue darken-1" flat @click.native="onClickSubmit(startTime, endTime, name, pass)">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'EditParticipantDialog',
  props: [
    'kasikiriId',
    'kasikiriData'
  ],
  data () {
    return {
      dialog: false,
      database: null,
      participantRef: null,
      startTime: null,
      endTime: null,
      menu1: false,
      menu2: false,
      pass: null,
      show: false,
      name: null,
      participantData: {},
      rules: {
        required: value => !!value || '必須項目です',
        endTime: value => this.startTime ? (this.startTime < value || '開始時刻よりも遅い時刻を設定してください') : '開始時刻よりも遅い時刻を設定してください',
        inKasikiriStart: value => (this.kasikiriData.startTime <= this.startTime) || 'イベント時間内の時刻を設定してください',
        inKasikiriEnd: value => (this.endTime <= this.kasikiriData.endTime) || 'イベント時間内の時刻を設定してください'
      }
    }
  },
  computed: {
  },
  created: function () {
    this.database = firebase.database()
  },
  methods: {
    onClickSubmit (startTime, endTime, name, pass) {
      if (!startTime || !endTime || !name || startTime >= endTime || ((pass || '') !== this.participantData.pass)) { return }
      this.participantRef.set({
        createdAt: new Date().getTime(),
        startTime: startTime,
        endTime: endTime,
        name: name,
        pass: pass || ''
      })
      this.close()
    },
    onClickDelete () {
      const inputPassword = this.pass || ''
      if (inputPassword === this.participantData.pass) {
        this.participantRef.set(null)
        this.close()
      }
    },
    open (participantId) {
      this.participantRef = this.database.ref('/kasikiris').child(this.kasikiriId).child('participants').child(participantId)
      this.participantRef.on('value', (snapshot) => {
        this.participantData = snapshot.val() || {}
        this.name = this.participantData.name || ''
        this.startTime = this.participantData.startTime || null
        this.endTime = this.participantData.endTime || null
      })
      this.dialog = true
    },
    allowedMinutes: m => m % 10 === 0,
    close () {
      this.participantRef = null
      this.participantData = {}
      this.dataReset()
      this.dialog = false
    },
    dataReset () {
      this.startTime = this.kasikiriData.startTime
      this.endTime = this.kasikiriData.endTime
      this.name = ''
      this.pass = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
