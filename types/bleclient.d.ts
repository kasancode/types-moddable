declare class BLEClient {
  onReady(): void;
  startScanning(params?: BLEClient.startScanningParam): void;
  onDiscovered(device: Device): void;
  stopScanning(): void;
  connect(device: Device): void;
  onConnected(device: Device): void;
  securityParameters: SecurityParameters;
}
declare namespace BLEClient {
  interface startScanningParam {
    active?: boolean;
    interval?: number;
    window?: number;
  }
}
declare class Device {
  connection: number;
  address: Bytes;
  scanResponse: Advertisement;
  readRSSI(): void;
  onRSSI(device: Device, rssi: number): void;
  discoverAllPrimaryServices(): void;
  discoverPrimaryService(uuid: Bytes): void;
  findServiceByUUID(uuid: Bytes): void;
  onServices(services: Service[]): void;
  close(): void;
  onDisconnected(): void;
}
declare class Service {
  connection: number;
  uuid: Bytes;
  start: number;
  end: number;
  characteristics: Characteristic[];
  discoverAllCharacteristics(): void;
  discoverCharacteristic(uuid: Bytes): void;
  findCharacteristicByUUID(uuid: Bytes): void;
  onCharacteristics(characteristics: Characteristic[]): void;
}
declare class Bytes {
  constructor(bytes: ArrayBuffer | string, littleEndian?: boolean);
  equals(buffer: Bytes): boolean;
}
declare namespace btutils {
  function address(
    literals: TemplateStringsArray,
    ...placeholders: string[]
  ): Bytes;
  function uuid(
    literals: TemplateStringsArray,
    ...placeholders: string[]
  ): Bytes;
}
declare class Advertisement {
  completeName: string;
  shortName: string;
  manufacturerSpecific: object;
  flags: number;
}
declare class Characteristic {
  connection: number;
  uuid: Bytes;
  service: Service;
  handle: number;
  descriptors: Descriptor[];
  discoverAllDescriptors(): void;
  onDescriptors(descriptors: Descriptor[]): void;
  enableNotifications(): void;
  onCharacteristicNotificationEnabled(charasteristic: Characteristic): void;
  disableNotifications(): void;
  onCharacteristicNotificationDisabled(characteristic: Characteristic): void;
  onCharacteristicNotification(
    characteristic: Characteristic,
    value: ArrayBuffer
  ): void;
  readValue(auth?: Authorization): void;
  onCharacteristicValue(
    characteristic: Characteristic,
    value: ArrayBuffer
  ): void;
  writeWithoutResponse(value: ArrayBuffer): void;
}
declare class Authorization {
  static readonly None: number;
  static readonly NoMITM: number;
  static readonly MITM: number;
  static readonly SignedNoMITM: number;
  static readonly SignedMITM: number;
}
declare class Descriptor {
  connection: number;
  uuid: Bytes;
  characteristic: Characteristic;
  handle: number;
  readvalue(auth: Authorization): void;
  writeValue(value: ArrayBuffer): void;
}
declare interface SecurityParameters {
  encryption: boolean;
  bonding: boolean;
  mitm: boolean;
  ioCapability: IOCapability;
}
declare class IOCapability {
  static readonly NoInputNoOutput: number;
  static readonly DisplayOnly: number;
}

export = BLEClient;
