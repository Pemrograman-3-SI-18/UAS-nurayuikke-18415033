<template>
    <q-page padding>
        <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="purple-6"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-purple-6">
              <div class="text-h6">Input Tugas</div>
              <div>Input Data Tugas Baru</div>
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
                type="string"
                label="Tanggal Kumpul"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Tanggal Kumpul']"
            />
            <q-input
                filled
                v-model="form.jamkelas"
                label="Jam Kelas"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Mata Jam Kelas']"
            />

            <q-select
              filled
              v-model="form.matapelajaran"
              :options="optionMatapelajaran"
              label="Pilih Mata Pelajaran"
            />

            <q-input
              v-model="form.deskripsitugas"
              filled
              type="textarea"
              label="Deskripsi Tugas"
            />

            <q-file accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
              <template v-slot:prepend>
                <q-icon name="cloud_upload"/>
              </template>
            </q-file>

            />
                <div>
                <q-btn label="Input" type="submit" color="primary"/>
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
        tanggalkumpul: null,
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
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('duty/insert', formData)
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
