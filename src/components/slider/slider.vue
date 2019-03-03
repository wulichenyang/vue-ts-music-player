<template lang="pug">
  div(class="slider" ref="slider")
    .slider-group(ref="sliderGroup")
      slot
    .dots
      span(
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{'active': currentPageIndex === index}"
      )
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BScroll from "better-scroll";
import { addClass } from "@/assets/js/dom";
@Component
export default class Slider extends Vue {
  public dots: Array<any> = [];
  public currentPageIndex: number = 0;
  public slider: any;
  public timer!: NodeJS.Timeout;
  public children!: HTMLCollectionOf<HTMLElement>;

  // 循环轮播
  @Prop({
    default: true
  })
  loop!: boolean;
  // 自动轮播
  @Prop({
    default: true
  })
  autoPlay!: boolean;
  // 轮播间隔ms
  @Prop({
    default: 4000
  })
  interval!: number;

  public scroll: any;
  // 根据视窗宽度设置slider-item的宽度
  public setSliderWidth(): void {
    // HTMLCollection
    this.children = ((this.$refs.sliderGroup as HTMLElement).children) as HTMLCollectionOf<HTMLElement>;
    let width: number = 0;
    let sliderWidth = (this.$refs.slider as HTMLElement).clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      addClass(child, "slider-item");
      child.style.width = sliderWidth + "px";
      width += sliderWidth;
    }

    if (this.loop) {
      width += 2 * sliderWidth;
    }
    (this.$refs.sliderGroup as HTMLElement).style.width = width + "px";
  }
  // 初始化BetterScroll
  public initSlider(): void {
    this.slider = new BScroll(this.$refs.slider, {
      scrollX: true,
      // scrollY: false,
      momentum: false,
      snap: {
        // 是否循环轮播
        loop: this.loop,
        // 阈值（超出才翻页）
        threshold: 0.3,
        // 轮播速度
        speed: 400
      },
      snapSpeed: 400,
      bounce: false,
      stopPropagation: true,
      click: true
    });
    this.slider.on("scrollEnd", this.onScrollEnd);
  }

  // 监听轮播动每页触发更新 pageIndex
  public onScrollEnd(): void {
    let pageIndex: number = this.slider.getCurrentPage().pageX;
    this.currentPageIndex = pageIndex;
    if (this.autoPlay) {
      // 重新开始轮播（清除timer 重置timer）
      this.play();
    }
  }
  public play(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.slider.next();
    }, this.interval);
  }
  public initDots(): void {
    this.dots = new Array(this.children.length);
  }
  mounted() {
    setTimeout(() => {
      this.setSliderWidth();
      this.initDots();
      this.initSlider();
      this.onScrollEnd();
    }, 20);
    // 重置窗口给大小后更新sliderwidth
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this.setSliderWidth();
    });
  }
  destroyed() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.slider {
  // min-height: 1px;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      img {
        display: block;;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    // font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        border-radius: 5px;
        background: $color-highlight-background;
      }
    }
  }
}
</style>
