<template>
  <v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">参加者登録</span>
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
                label="削除パスワードを入力してください"
                type="text"
                v-model="pass"
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
                  :allowed-minutes="allowedMinutes"
                  format="24hr"
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
                  v-model="endTime"
                  :allowed-minutes="allowedMinutes"
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
  name: 'CreateParticipantDialog',
  props: [
    'kasikiriId',
    'kasikiriData'
  ],
  data () {
    return {
      dialog: false,
      startTime: null,
      endTime: null,
      menu1: false,
      menu2: false,
      pass: null,
      name: null,
      rules: {
        required: value => !!value || '必須項目です',
        endTime: value => (this.startTime ? (this.startTime < value || '開始時刻よりも遅い時刻を設定してください') : '開始時刻よりも遅い時刻を設定してください'),
        inKasikiriStart: value => (this.kasikiriData.startTime <= this.startTime) || 'イベント時間内の時刻を設定してください',
        inKasikiriEnd: value => (this.endTime <= this.kasikiriData.endTime) || 'イベント時間内の時刻を設定してください'
      }
    }
  },
  computed: {
  },
  mounted () {
    this.startTime = this.kasikiriData.startTime
    this.endTime = this.kasikiriData.endTime
  },
  methods: {
    onClickSubmit (startTime, endTime, name, pass) {
      if (!startTime || !endTime || !name || startTime >= endTime) { return }
      firebase.database().ref('/kasikiris').child(this.kasikiriId).child('participants').push({
        createdAt: new Date().getTime(),
        startTime: startTime,
        endTime: endTime,
        name: name,
        pass: pass || ''
      })
      this.close()
    },
    allowedMinutes: m => m % 10 === 0,
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.dataReset()
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
