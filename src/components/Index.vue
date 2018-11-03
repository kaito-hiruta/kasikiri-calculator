<template>
  <v-app id="inspire">
    <v-layout row wrap>
      <v-flex xs12>
        <create-kasikiri-dialog ref="childDialog"></create-kasikiri-dialog>
        <v-card color="teal darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="headline">このページについて</div>
              <div>途中参加等がある場合の面倒な割勘を自動で計算するツールです．</div>
              <div>製作途中なので動作しなかったり，機能がまだなかったりする可能性もあります．</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="cyan darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="headline">使い方 (主催者)</div>
              <div>まずはイベント専用ページを作りましょう．以下のボタンを押すと作成することができますので，開始時刻と終了時刻，合計金額を設定し，参加者にURLを共有してください．</div>
            </v-flex>
          </v-card-title>
          <v-card-actions>
            <v-btn slot="activator" @click="onClickMakeKasikiriButton()" flat dark class="white--text font-weight-bold">イベント専用ページを作る</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="indigo darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="headline">使い方 (参加者)</div>
              <div>専用ページでは以下のことを記入できます．</div>
              <v-card color="indigo darken-3" class="white--text">
                <ul>
                  <li>・自分の名前</li>
                  <li>・自分が参加開始した時刻</li>
                  <li>・自分が参加終了した時刻</li>
                </ul>
              </v-card>
              <div>また，現状で入力している人数での，参加時間に応じた割勘金額が確認できます</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card color="purple" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="">注意</div>
              <div>金額が間違っている等，利用者にいかなる不利益が生じた場合でも当方は責任は負いかねます．</div>
              <div>セキュリティはかなりガバガバなので，信用できる人同士で使ってください．</div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
  </v-app>
</template>

<script>
import CreateKasikiriDialog from '@/components/CreateKasikiriDialog.vue'

export default {
  name: 'Index',
  components: {
    CreateKasikiriDialog
  },
  data () {
    return {
    }
  },
  methods: {
    onClickClose () {
    },
    onClickMakeKasikiriButton () {
      this.$refs.childDialog.open()
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
