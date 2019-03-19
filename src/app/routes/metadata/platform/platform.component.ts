import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styles: []
})
export class PlatformComponent implements OnInit {
  isVisible = false;
  constructor() { }

  ngOnInit() {
    this.updateEditCache();
  }

  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;
  data = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 1'}, {href:'https://www.baidu.com/', tag: 'tag 11'}]
    },
    {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'', tag: 'tag 2'}, {href:'https://www.baidu.com/', tag: 'tag 22'}]
    },
    {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'', tag: 'tag 3'}]
    },
    {
      key    : '4',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 4'}]
    },
    {
      key    : '5',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'', tag: 'tag 5'}]
    },
    {
      key    : '6',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 6'}]
    },
    {
      key    : '7',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 7'}]
    },
    {
      key    : '8',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 8'}]
    },
    {
      key    : '9',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 9'}]
    },
    {
      key    : '10',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 10'}]
    },
    {
      key    : '11',
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      hrefTags: [{href:'https://www.baidu.com/', tag: 'tag 11'}]
    }
  ];
  displayData = [ ...this.data ];

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) && (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  editCache = {};
  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.displayData.findIndex(item => item.key === key);
    Object.assign(this.displayData[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  updateEditCache(): void {
    this.displayData.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  handleClose(removedTag: {}, tags: any): void {
    console.log(removedTag, tags);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 10;
    return isLongTag ? `${tag.slice(0, 10)}...` : tag;
  }

  showModal(): void {
    this.isVisible = true;
  }

  getModalInfo(e: any) {
    this.isVisible = false;
  }

}
