<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="purple-6"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Tugas</div>
              <div>Data Murid Mengkonfirmasi Tugas</div>
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
              <q-td key="judulTugas" :props="props">
                {{ props.row.dataDuty[0].judulTugas }}
              </q-td>
              <q-td key="tanggalkumpul" :props="props">
                {{ props.row.tanggalkumpul}}
              </q-td>
              <q-td key="jamkelas" :props="props">
                {{ props.row.jamkelas}}
              </q-td>
              <q-td key="nama" :props="props">
                {{ props.row.dataUser[0].namaLengkap }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                  Belum Dikonfirmasi
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                  Sedang Dalam Pengiriman
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Sudah Diterima Murid
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" @click="openDetail(props.row)" color="primary" unelevated/>
                <q-btn :disable="props.row.status !== 1" label="Konfirmasi" @click="confirm(props.row._id)" class="q-ml-sm" color="green" unelevated/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detail Tugas</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-caption">
                Nama Murid
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataUser[0].namaLengkap }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Judul Tugas
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataDuty[0].judulTugas }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Jam Kelas
              </div>
              <div class="text-weight-bold">
                {{ activeData.jamkelas }}
              </div>
            </div>
            </div>
          <div class="row">
            <q-img :src="`${$baseImageURL}/${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'namaMurid', align: 'center', label: 'Nama Murid', field: 'namaMurid', sortable: true },
        { name: 'judultugas', align: 'center', label: 'Judul Tugas', field: 'judultugas', sortable: true },
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
      this.$axios.get('work/getallwork')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Mengkonfirmasi Tugas?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`work/konfirmasiwork/${id}`)
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
