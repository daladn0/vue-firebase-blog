import { isDescendant } from "@/helpers";

export const clickOutside = {
  mounted: (el, binding, vnode) => {
    const trigger = document.getElementById(vnode.props.trigger);
    el.clickOutsideEvent = function (event) {
      if (
        !(
          el == event.target ||
          el.contains(event.target) ||
          trigger == event.target ||
          isDescendant(trigger, event.target)
        )
      ) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};