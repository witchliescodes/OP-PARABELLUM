document.addEventListener("DOMContentLoaded", () => {
  if (typeof MONOMER_MODAL === "undefined") return;

  const proto = MONOMER_MODAL.prototype;
  if (proto._patchedClose) return; 
  const originalClose = proto.close;

  proto.close = function () {
    originalClose?.call(this);

    requestAnimationFrame(() => {
      this.modal?.remove();
      this.overlay?.remove();
    });
  };

  proto._patchedClose = true;
});
