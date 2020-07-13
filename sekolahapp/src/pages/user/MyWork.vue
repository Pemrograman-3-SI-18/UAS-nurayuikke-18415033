<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Tugas</div>
              <div>Data Tugas Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
        <q-table
          :data="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="namamurid" :props="props">
                {{ props.row.dataDuty[0].namamurid }}
              </q-td>
              <q-td key="judulTugas" :props="props">
                {{ props.row.judulTugas}}
              </q-td>
              <q-td key="jamkelas" :props="props">
                {{ props.row.jamkelas}}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                  Belum Dikonfirmasi Guru
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                  Guru Sedang Mengirim
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Sudah Diterima
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn :disable="props.row.status !== 2" label="Terima Tugas" @click="confirm(props.row._id)" class="q-ml-sm" color="green" unelevated/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'namamurid', align: 'center', label: 'Nama Murid', field: 'namamurid', sortable: true },
        { name: 'judulTugas', align: 'center', label: 'Judul Tugas', field: 'judultugas', sortable: true },
        { name: 'jamkelas', align: 'center', label: 'Jam Kelas', field: 'jamkelas', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`work/getworkbyuser/${this.$q.localStorage.getItem('dataUser')._id}`)
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Sudah Menerima Tugas?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`work/terimatugas/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>
<style scoped>
  .left {
    width: 5px;
    height: 100%;
    background: aqua;
  }
</style>
