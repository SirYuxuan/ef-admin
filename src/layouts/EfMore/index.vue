<template>
  <span class="ef-tabs-more">
    <span class="ef-tabs-more-icon">
      <i class="box box-t"></i>
      <i class="box box-b"></i>
    </span>
  </span>
</template>

<script>
export default {
  name: 'EfMore'
}
</script>

<style lang="scss" scoped>
.ef-tabs-more {
  .ef-tabs-more-icon {
    display: inline-block;
    color: #9a9a9a;
    cursor: pointer;
    transition: transform .3s ease-out;
    .box {
      position: relative;
      display: block;
      width: 14px;
      height: 8px;
    }
    .box:before,.box:after{
      position: absolute;
      top: 2px;
      left: 0;
      width: 6px;
      height: 6px;
      content: "";
      background: #9a9a9a;
    }
    .box:after {
      left: 8px;
    }
  }
}
.ef-tabs-more:hover{
  .box:before,.box:after{
    background: var(--el-color-primary);
  }
  .box-t:before {
    transform: rotate(45deg);
  }
  .ef-tabs-more-icon{
    transform: rotate(90deg);
  }
}
</style>