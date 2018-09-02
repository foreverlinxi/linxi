<template>
    <div>
      <div class="location-pinyin-item" v-if="itemClassName !== 'null'">{{itemClassName}}</div>
      <div class="location-pinyin-null" v-else></div>
    </div>
</template>

<script>

export default {
  name: 'locationPinyinItem',
  data () {
    return {
      //
    }
  },
  props: ['itemClassName'],
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location-pinyin-item {
  height: 28px;
  width: 28px;
  background: #fff;
  /* margin-right: 15px; */
  margin-top: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #8d8d8d;
  border: 1px solid #5ac4f3;
}
.location-pinyin-null {
  height: 28px;
  width: 28px;
  margin-top: 15px;
}
</style>
