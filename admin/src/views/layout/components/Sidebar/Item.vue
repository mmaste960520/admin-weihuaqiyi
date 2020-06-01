<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    // if (icon) {
    //   vnodes.push(<svg-icon icon-class={icon}/>)
    // }
    if (icon) {
      vnodes.push(<img class="menu-item-img" src={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  }
};
</script>
<style lang="scss" scoped>
.menu-item-img {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  vertical-align: middle;
  background: #ececec;
  padding: 7px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  margin-left: -5px;
}
</style>

