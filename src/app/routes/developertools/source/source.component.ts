import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceComponent implements OnInit {
  // region: cateogry
  categories = [
    { id: 0, text: '全部', value: false },
    { id: 1, text: '栅格', value: true },
    { id: 2, text: '矢量瓦片', value: false },
    { id: 3, text: '业务', value: false },
    { id: 4, text: '其他', value: false }
  ];

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
      this.categories.map(category => {
        if(category.id !== idx) {
          category.value = false;
        }
      });
    }
  }
  // endregion
  list: any[] = [
    {
      title: "Alipay",
      cover: "https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png",
      subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的"
    },
    {
      title: "Angular",
      cover: "https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png",
      subDescription: "在中台产品的研发过程中"
    },
    {
      title: "Ant Design",
      cover: "https://gw.alipayobjects.com/zos/rmsportal/RLwlKSYGSXGHuWSojyvp.png",
      subDescription: "生命就像一盒巧克力，结果往往出人意料"
    },
    {
      title: "Ant Design Pro",
      cover: "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
      subDescription: "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆"
    },
    {
      title: "Bootstrap",
      cover: "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
      subDescription: "那时候我只会想自己想要什么，从不想自己拥有什么"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
