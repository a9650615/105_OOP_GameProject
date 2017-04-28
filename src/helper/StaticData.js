let datas = {}

export default class StaticData {
  static load(name = null) {
    if (name) return datas[name];
    return datas;
  }

  static set(name, data) {
    if (name)
      datas[name] = data

      return datas
  }
}
