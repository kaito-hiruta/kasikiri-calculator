<template>
  <v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">貸切ページ作成</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="イベントの名前を入力してください"
                type="text"
                :rules="[rules.required]"
                v-model="name"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="貸切の合計金額を入力してください"
                hint="数値で入力してください"
                suffix="円"
                type="number"
                v-model="price"
                persistent-hint
                required
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
                  :rules="[rules.required]"
                  label="開始時刻を選んでください"
                  prepend-icon="access_time"
                  readonly
                  required
                ></v-text-field>
                <v-time-picker
                  v-if="menu1"
                  v-model="startTime"
                  format="24hr"
                  full-width
                  :allowed-minutes="allowedMinutes"
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
                  :rules="[rules.required, rules.endTime]"
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
        <v-btn color="blue darken-1" flat @click.native="onClickSubmit(price, startTime, endTime, name)">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'CreateKasikiriDialog',
  data () {
    return {
      dialog: false,
      startTime: null,
      endTime: null,
      menu1: false,
      menu2: false,
      price: null,
      name: '',
      rules: {
        required: value => !!value || '必須項目です',
        endTime: value => this.startTime ? (this.startTime < value || '開始時刻よりも遅い時刻を設定してください') : '開始時刻よりも遅い時刻を設定してください'
      }
    }
  },
  computed: {
  },
  methods: {
    onClickSubmit (price, startTime, endTime, name) {
      if (!price || !startTime || !endTime || !name || startTime >= endTime) { return }
      console.log(price, startTime, endTime)
      const kasikiriKey = firebase.database().ref('/kasikiris').push({
        createdAt: new Date().getTime(),
        price: price,
        startTime: startTime,
        endTime: endTime,
        name: name
      }).key
      this.$router.push({ name: 'kasikiri', params: { kasikiriId: kasikiriKey } })
    },
    allowedMinutes: m => m % 10 === 0,
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
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
