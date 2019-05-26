<template lang="pug">
div.root-wrapper-container
    header.header-container 
        input-app(  v-model="searching",
                    placeholder="Что вы хотите найти?"
                    v-bind="$attrs"
                    @input="collectData").searching-input
        ul(v-if="showResult")
            li(v-for="match in data" v-if="searching.length>0")
                span(v-html="match")
</template>
<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "./styles/mixins.pcss";
@import "./styles/layout/base.pcss";
</style>


<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    data() {
        return {
            showResult: true,
            searching:'',
        }
    },
    components: {
        inputApp: ()  => import('components/input')
    },
  computed: {
        ...mapState("data", {
            data: state => state.data,
        })
      },
  methods: {
    ...mapActions("data", ["fetchData"]),
     async collectData() {
      try {
          console.log(this.searching);
        await this.fetchData(this.searching);
      } catch (error) {
        alert({
          type: "error",
          text: "Не удалось загурузить отзывы"
        });
      }
    }
  },
}
</script>