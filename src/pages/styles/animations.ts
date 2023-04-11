export const disableAllAnimations = () => {
  return {
    animationDuration: '0s !important',
    '-webkit-animation-duration': '0s !important',
    transition:
      'background-color 0s, opacity 0s, color 0s, width 0s, height 0s, padding 0s, margin 0s !important',
  }
}
