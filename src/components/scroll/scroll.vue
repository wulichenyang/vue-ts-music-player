<template lang="pug">
  section(ref="scrollWrapper")
    slot
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import BScroll from "better-scroll";

@Component
export default class Scroll extends Vue {
  @Prop({
    type: Number,
    default: 1
  })
  probType!: number;
  @Prop({
    type: Boolean,
    default: true
  })
  click!: boolean;
  @Prop({
    type: Array,
    default: null
  })
  data!: Array<any>;
  @Prop({
    type: Boolean,
    default: false
  })
  listenScroll!: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  pullup!: boolean;
  @Prop({
    type: Number,
    default: 20
  })
  refreshDelay!: number;

  @Emit("scroll")
  public emitScroll(pos: number) {}
  @Emit("scrollToEnd")
  public emitScrollToEnd() {}

  public scroll: any;
  mounted() {
    setTimeout(() => {
      this.initScroll();
    });
  }
  initScroll(): void {
    if (!this.$refs.srcollWrapper) {
      return;
    }
    // 初始化better-scroll
    this.scroll = new BScroll(this.$refs.scrollWrapper, {
      probType: this.probType,
      click: this.click
    });
    // 监听滚动事件触发 emit 滚动位置
    if (this.listenScroll) {
      let _this = this;
      this.scroll.on("scroll", (pos: number) => {
        this.emitScroll(pos);
      });
    }
    // 监听滚动到底部事件触发 emit 滚动底部
    if (this.pullup) {
      this.scroll.on("scrollEnd", () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 50) {
          this.emitScrollToEnd();
        }
      });
    }
  }
  public enable(): void {
    this.scroll && this.scroll.enable();
  }
  public disable(): void {
    this.scroll && this.scroll.disable();
  }
  public refresh(): void {
    this.scroll && this.scroll.refresh();
  }
  public scrollTo(): void {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  public scrollToElement(): void {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
}
</script>
