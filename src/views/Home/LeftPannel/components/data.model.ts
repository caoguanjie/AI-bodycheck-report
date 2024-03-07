export class GetItemList {
    ComposeID: string
    ComposeName: string
    selected: boolean
    visible: boolean
    ItemList: ItemList[]
    /**
     * @typedef  {Object} GetItemList 
     * @property {string} ComposeID 组合ID
     * @property {string} ComposeName 组合名称
     * @property {boolean} selected 是否选中
     * @property {boolean} visible  是否显示
     * @property {ItemList[]} ItemList 组合明细
     */
    constructor({ ComposeID, ComposeName, selected, visible, ItemList, isInit } = {} as any) {
        this.ComposeID = ComposeID;
        this.ComposeName = ComposeName;
        this.selected = selected ?? true;
        this.visible = visible ?? true;
        this.initChilrenData(ItemList, isInit)
    }

    initChilrenData(itemList: any[], isInit = false) {
        if (!itemList) {
            this.ItemList = []
            return;
        }
        this.ItemList = itemList.map((item: any) => {
            return new ItemList({ ...item, Value: isInit ? '' : item.Value });
        })
    }

}




export class ItemList {
    ItemID: string
    ItemName: string
    ItemUnit: string
    Value: string
    HighValue: string
    LowValue: string
    MaxValue: string
    MinValue: string
    /**
     * @typedef  {Object} ItemList
     * @property {string} ItemID 项目ID
     * @property {string} ItemName 项目名称
     * @property {string} ItemUnit 单位
     * @property {string} Value 结果值
     * @property {string} HighValue 高值
     * @property {string} LowValue   低值
     * @property {string} MaxValue    最大值
     * @property {string} MinValue    最小值
     */
    constructor({ ItemID, ItemName, ItemUnit, Value, HighValue, LowValue, MaxValue, MinValue } = {} as any) {
        this.ItemID = ItemID;
        this.ItemName = ItemName;
        this.ItemUnit = ItemUnit;
        this.Value = Value;
        this.HighValue = HighValue;
        this.LowValue = LowValue;
        this.MaxValue = MaxValue;
        this.MinValue = MinValue;

    }
}