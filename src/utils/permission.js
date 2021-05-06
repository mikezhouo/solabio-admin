import Vue from "vue";
import router from "@/router";
Vue.directive("permit", {
  inserted(el, binding) {
    console.log(el);
    console.log(binding);
    console.log(router);
    const action = binding.value.action;
    const effect = binding.value.effect;
    const ThreeRights = router.currentRoute.meta;
    if (ThreeRights.indexOf(action) === -1) {
      if (effect === "disabled") {
        el.disabled = true;
        el.classList.add('is-disabled')
      } else {
        el.parentNode.removeChild(el);
      }
    }
  }
});
