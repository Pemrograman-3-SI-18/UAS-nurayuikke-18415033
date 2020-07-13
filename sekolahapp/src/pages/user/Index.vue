<template>
    <q-page padding>
        <div class="q-mb-xl">
        <q-carousel
            animated
            v-model="slide"
            navigation
            infinite
            autoplay
            arrows
            swipeable
            transition-prev="slide-right"
            transition-next="slide-left"
            >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
        </div>
        <div class="row q-col-gutter-md">
        <div class="col-md-3 col-xs-12" v-for="(duty, i) in data" :key="i">
            <q-card>
            <q-img
              :src="`${$baseImageURL}/${duty.image}`"
              :ratio="16/9"
              />

            <q-card-section>
            <q-btn
            fab
            color="primary"
            icon="book"
            class="absolute"
            unelevated
            style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
                {{ duty.judulTugas }}
            </div>
            </div>

            <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
                {{ duty.matapelajaran }}
            </div>
            <div @click="duty.expanded = !duty.expanded" class="text-caption text-grey cursor-pointer">
              Tampilkan Deskripsi Tugas
            </div>
            <q-slide-transition>
              <div v-show="duty.expanded">
                <div class="text-grey text-caption">
                  {{ duty.deskripsitugas }}
                </div>
              </div>
            </q-slide-transition>
            </q-card-section>
            </q-card-section>

        <q-card-actions>
            <q-btn unelevated @click="openDetail(duty)" class="full-width" color="primary">
            Ambil Tugas
            </q-btn>
        </q-card-actions>
        </q-card>
          </div>
        </div>
        <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Detail Tugas</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh;" class="scroll">
            {{ activeData.judulTugas }}
            <q-form class="q-mt-md">
            </q-form>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="Batal" v-close-popup/>
            <q-btn color="primary" @click="prosesTransaksi()" label="Proses"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      dialog: false,
      image: null,
      data: [],
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('duty/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(duty => {
              return Object.assign(duty, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idTugas: this.activeData._id,
        namamurid: this.activeData.namamurid
      }))
      this.$axios.post('duty/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
