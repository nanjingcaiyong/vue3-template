import { defineComponent, VNode, isVNode, Fragment, ComponentPublicInstance } from 'vue'
import { getPrefixCls } from '../utils/config'
import { createFromIconfontCN } from '../icon/index'
import PropTypes from 'vue-types'
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2489304_8wiabwvtlgf.js', // 在 iconfont.cn 上生成
});


function getSlot (self: ComponentPublicInstance, name="default") {
    return self.$slots[name] && self.$slots[name]?.()
}

export default defineComponent({
  props: {
    isVertical: PropTypes.bool.def(false),
    activeKeys: PropTypes.oneOfType([PropTypes.array]).def([]),
    tabColor: PropTypes.string.def('')
  },
  methods: {
    /**
     * @description 切换选中的key
     * @param key 选中的key
     */
    changeActivekey (key: string) {
      let val: any = [key]
      if (this.isVertical) {
        val = new Set([key])
        let length = this.activeKeys.length || 0
        while(length--) {
          this.activeKeys[length] === key 
            ? val.delete(key)
            : val.add(this.activeKeys[length])
        }
        val = [...val]
      }
      return this.$emit('update:activeKeys', val)
    }
  },
  render() {
    const { activeKeys, isVertical, changeActivekey, tabColor } = this

    const prefixCls = getPrefixCls('tabs')
    
    let tabs = this.$slots.default?.() // 获取所有tabpanes
  
    let childrens: VNode[] = []
    tabs?.forEach(tab => {
      if (typeof tab.type === 'symbol') { // 如果tabpane是v-for渲染的,则所有的tabpane会被包在一个VNode下,这个VNode是tabs数组第一个元素,它的children才是真正的tabpane
        childrens = tab.children as VNode[]
      } else { // tabpane平铺
        childrens.push(tab)
      }
    })
    
    // 判断当前tabpane是否选中
    const isActive = (vNode: VNode) => activeKeys.includes(`${vNode.key}`)

    // 组装所有的tab
    const tabsBar = childrens?.map(vNode => {
      const tabCls = {
        [`${prefixCls}-tab`]: true, 
        [`${prefixCls}-tab_active`]: isActive(vNode)
      }
      return (
        <div class={tabCls} style={{background: isActive(vNode) ? tabColor : ''}}>
          <a v-html={vNode.props?.tab} onClick={()=>{ changeActivekey(`${vNode.key}`) }} style="white-space: pre;" />
        </div>
      )
    })
    // pc端所有tab content共用同一高度
    // 取所有tab content高度的最大值, 作为content的唯一高度
    if (!isVertical) {
      setTimeout(() => {
        let maxHeight = 200

        document.querySelectorAll('.shopify-tabs-container').forEach(elm => {
          maxHeight = Math.max(maxHeight, Number(window.getComputedStyle(elm).height.replace('px', '')))
        });
        const tabContent = document.querySelector('.shopify-tabs-content') as HTMLBaseElement
        (tabContent?.style || {}).minHeight = maxHeight + 'px'
      }, 0);
    }
    // 所有tab 的content内容
    const tabsContent = childrens?.map(vNode => {
      const cls = {
        [`${prefixCls}-container`]: true,
        [`${prefixCls}-hide`]: !isActive(vNode)
      } 
      return <div class={ cls }>{ vNode }</div>
    })

    const cls = {
      [prefixCls]: true,
      [`${prefixCls}-pc`]: !isVertical,
      [`${prefixCls}-m`]: isVertical
    }
    
    const horizontalTabs = (
      <div class={cls}>
        <div class={`${prefixCls}-sidebar`}>{ tabsBar }</div>
        <div class={`${prefixCls}-content`}>{ tabsContent }</div>
      </div>
    )
    
    const verticalTabs = (
      <ul class={cls}>
        { childrens?.map(vNode => (
          <li class={`${prefixCls}-tabpane`}>
            <div class={`${prefixCls}-label`}>
              <a onClick={()=>{ changeActivekey(`${vNode.key}`) }}>
                <span v-html={vNode.props?.tab} style="white-space: pre;"></span>
                <MyIcon type={isActive(vNode) ? "icon_arrow_up" : 'icon_arrow_down'} style={{color: isActive(vNode) ? '': '#c6c6c6'}}></MyIcon>
              </a>
            </div>
            { isActive(vNode) ? <div class={`${prefixCls}-content`}>{vNode}</div> : '' } 
          </li>
        )) }
      </ul>
    )
    return isVertical ? verticalTabs : horizontalTabs
  }
})