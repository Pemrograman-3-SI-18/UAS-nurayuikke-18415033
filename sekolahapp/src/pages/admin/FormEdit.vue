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
              <div class="text-h6">Edit Tugas</div>
              <div>Input Tugas Baru</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="row">
        <q-form
          @submit="onSubmit()"
            class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
            >
            <q-input
                filled
                v-model="form.judulTugas"
                label="Judul Tugas"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Judul Tugas']"
            />
            <q-input
                filled
                v-model="form.tanggalkumpul"
                type="number"
                label="Tanggal Kumpul"
            />
            <q-input
                filled
                v-model="form.jamkelas"
                label="Jam Kelas"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Jam Kelas']"
            />

            <q-select
              filled
              v-model="form.matapelajaran"
              :options="optionMatapelajaran"
              label="Pilih MataPelajaran"
            />

            <q-input
              v-model="form.deskripsitugas"
              filled
              type="textarea"
              label="Deskripsi Tugas"
            />

            <q-file accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
      </q-card-section>
    </q-card>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        judulTugas: null,
        tanggalkumpul: 0,
        jamkelas: null,
        matapelajaran: null,
        deskripsitugas: null
      },
      optionMatapelajaran: [
        'Agama Islam',
        'Matematika',
        'Bahasa Indonesia',
        'IPA',
        'IPS',
        'Seni Budaya',
        'Penjaskes',
        'Bahasa Lampung'
      ],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`duty/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataTugas' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`duty/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataTugas' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
  .left {
    width: 5px;
    height: 100%;
    background: aqua;;
  }
</style>
