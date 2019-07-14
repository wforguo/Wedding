<template>
    <div class="box">
        <swiper class="swiper"
            :autoplay="true"
            :circular="true"
            current="0"
            :indicator-dots="true"
            :vertical="true"
        >
            <repeat for="{{list}}" item="item" wx:key="index">
                <swiper-item class="item">
                    <view clsss="" style="width: 100%;height: 100%;position: absolute">{{item.url}}</view>
                    <image mode="aspectFill" lazy-load="true" src="{{item.src}}" class="slide-image"/>
                </swiper-item>
            </repeat>
        </swiper>
    </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list']
}
</script>

<style lang="stylus" scoped>
.box
    position relative
    height 100%
    .swiper
        height 100%
        width 100%
        .item
            width 100%
            height 100%
            image
                width 100%
                height 100%
                display block
</style>
