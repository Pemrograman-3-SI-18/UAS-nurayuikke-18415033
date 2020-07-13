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
              <div>Data Tugas Siswa</div>
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
                {{ props.row.judulTugas }}
              </q-td>
              <q-td key="tanggalkumpul" :props="props">
                {{ props.row.tanggalkumpul }}
              </q-td>
              <q-td key="jamkelas" :props="props">
                {{ props.row.jamkelas }}
              </q-td>
              <q-td key="matapelajaran" :props="props">
                {{ props.row.matapelajaran }}
              </q-td>
              <q-td key="deskripsitugas" :props="props">
                <div class="ellipsis" style="max-widht: 200px;">
                    {{ props.row.deskripsitugas }}
                </div>
              </q-td>
              <q-td key="gambar" :props="props">
                <q-img
                :src="`${$baseImageURL}/${props.row.image}`"
                spinner-color="white"
                />
              </q-td>
              <q-td key="aksi" :props="props">
                <div class="row q-gutter-md">
                    <q-btn :to="{ name: 'formEditTugas', params: { id: props.row._id } }" label="Edit" icon="edit" color="warning" unelevated/>
                    <q-btn @click="deleteDuty(props.row._id)" label="Hapus" icon="delete" color="negative" unelevated/>
                </div>
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
        { name: 'judulTugas', align: 'left', label: 'Judul Tugas', field: 'judulTugas', sortable: true },
        { name: 'tanggalkumpul', align: 'left', label: 'Tanggal Kumpul', field: 'tanggalkumpul', sortable: true },
        { name: 'jamkelas', align: 'left', label: 'Jam Kelas', field: 'jamkelas', sortable: true },
        { name: 'matapelajaran', align: 'left', label: 'Mata Pelajaran', field: 'matapelajaran', sortable: true },
        { name: 'deskripsitugas', align: 'left', label: 'Deskripsi Tugas', field: 'deskripsitugas', sortable: true },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('duty/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteDuty (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Menghapus Tugas',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`duty/delete/${id}`)
          .then(res => {
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
