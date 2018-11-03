<template>
  <v-app id="inspire">
    <v-layout row wrap>

      <v-flex xs12>
        <v-card color="teal darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="headline">貸切情報</div>
              <v-card color="teal darken-3" class="white--text">
                <ul>
                  <li>{{ this.kasikiriData.name || '' }}</li>
                  <li>{{ startEndTimeString }}</li>
                  <li>{{ priceString }}</li>
                </ul>
              </v-card>
            </v-flex>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark @click="onClickMakeParticipantButton()" class="white--text font-weight-bold">参加登録</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <create-participant-dialog ref="childDialog" :kasikiriId="kasikiriId" :kasikiriData="kasikiriData"/>

      <edit-participant-dialog ref="childEditDialog" :kasikiriId="kasikiriId" :kasikiriData="kasikiriData" :participantId="targetParticipantId"/>

      <v-flex xs12>
        <v-card color="cyan darken-2" class="white--text">
          <v-card-title primary-title>
            <v-flex>
              <div class="headline">参加者一覧</div>
              <v-data-table
                :headers="headers"
                :items="participants"
                class="elevation-1"
                no-data="貸   切   ０   人"
              >
                <template slot="items" slot-scope="props">
                  <td class="px-0"><v-btn flat dark icon @click="onClickEditParticipantButton(props.item.participantId)" class="black--text font-weight-bold"><v-icon>mdi-pencil</v-icon></v-btn></td>
                  <td class="text-xs-left px-0">{{ props.item.name }}</td>
                  <td class="text-xs-center px-2">{{ priceOfItem(props.item) | ceiling }}</td>
                  <td class="text-xs-center px-1">{{ props.item.startTime }}</td>
                  <td class="text-xs-center px-1">{{ props.item.endTime }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import CreateParticipantDialog from '@/components/CreateParticipantDialog.vue'
import EditParticipantDialog from '@/components/EditParticipantDialog'

export default {
  name: 'Kasikiri',
  components: {
    CreateParticipantDialog,
    EditParticipantDialog
  },
  data () {
    return {
      database: null,
      todosRef: null,
      kasikiriId: this.$route.params.kasikiriId,
      kasikiriData: {},
      targetParticipantId: null,
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          class: 'px-0'
        },
        {
          text: '参加者名',
          align: 'left',
          sortable: true,
          value: 'name',
          class: 'px-0'
        },
        {
          text: '金額',
          align: 'left',
          sortable: true,
          value: 'price',
          class: 'px-2'
        },
        {
          text: '開始時間',
          align: 'center',
          sortable: true,
          value: 'startTime',
          class: 'px-1'

        },
        {
          text: '終了時間',
          align: 'center',
          sortable: true,
          value: 'endTime',
          class: 'px-1'
        }
      ]
    }
  },
  computed: {
    startEndTimeString () {
      const startTime = this.kasikiriData.startTime || ''
      const endTime = this.kasikiriData.endTime || ''
      return (startTime + ' ~ ' + endTime)
    },
    priceString () {
      const price = this.kasikiriData.price || ''
      return price + ' 円'
    },
    participants () {
      const data = this.kasikiriData.participants
      let participantsData = []
      if (!data) { return [] }
      for (const key of Object.keys(data)) {
        const value = data[key]
        console.log(value)
        participantsData.push({
          name: value.name,
          startTime: value.startTime,
          endTime: value.endTime,
          participantId: key
        })
      }
      console.log(this.kasikiriData, data, participantsData)
      return participantsData
    },
    allTimesSum () {
      const data = this.kasikiriData.participants
      let timesSum = 0
      for (const value of Object.values(data)) {
        timesSum += this.subS(value.startTime, value.endTime)
      }
      return timesSum
    }
  },
  methods: {
    onClickMakeParticipantButton () {
      this.$refs.childDialog.open()
    },
    onClickEditParticipantButton (id) {
      console.log(id)
      this.$refs.childEditDialog.open(id)
    },
    priceOfItem (item) {
      const sum = this.allTimesSum
      return this.kasikiriData.price * this.subS(item.startTime, item.endTime) / sum
    },
    toS (d) { // 秒数に変換
      if (!d) { return 0 }
      const a = d.split(':')
      return Number(a[0]) * 60 + Number(a[1])
    },
    subS (d1, d2) { // 秒数の差を取得 d2 > d1 とする
      return this.toS(d2) - this.toS(d1)
    }
  },
  created: function () {
    console.log(this.$route.params.kasikiriId)
    this.database = firebase.database()
    this.kasikiriRef = this.database.ref('/kasikiris').child(this.kasikiriId)
    this.kasikiriRef.on('value', (snapshot) => {
      this.kasikiriData = snapshot.val()
    })
  },
  filters: {
    ceiling (value) {
      return Math.ceil(value / 100) * 100
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
