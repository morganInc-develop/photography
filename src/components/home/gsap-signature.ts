import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

let signatureRegistered = false;

export function ensureSignatureEase() {
  if (signatureRegistered) {
    return;
  }

  gsap.registerPlugin(CustomEase);
  CustomEase.create("signature", "0.625, 0.05, 0, 1");
  signatureRegistered = true;
}
