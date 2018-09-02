import dialogMain from './dialog'

let Dialog = {}

Dialog.install = (Vue) => {
  Vue.prototype.$dialog = {}
  let DialogMainCom = Vue.extend(dialogMain)
  let instance = new DialogMainCom({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)

  Vue.prototype.$dialog.show = (settings = {}) => {
    instance.show = true
    instance.message = settings.message
    settings.cancelText && (instance.cancelText = settings.cancelText)
    settings.confirmText && (instance.confirmText = settings.confirmText)
    settings.confirmCallback && (instance.confirmCallback = settings.confirmCallback)
    settings.cancelCallback && (instance.cancelCallback = settings.cancelCallback)
  }
}
export default Dialog
