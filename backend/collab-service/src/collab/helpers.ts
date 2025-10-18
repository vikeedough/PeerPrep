export function toUint8(data: unknown): Uint8Array {
  if (data instanceof Uint8Array) return data;
  // Node Buffer
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data))
    return new Uint8Array(data);
  // Browser ArrayBuffer that made it through
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  // ArrayBufferView (e.g., DataView)
  if (ArrayBuffer.isView(data))
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  return new Uint8Array();
}
