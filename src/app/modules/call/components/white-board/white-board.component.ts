import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.scss']
})
export class WhiteBoardComponent implements OnInit {

  svgWidth = 0;
  svgHeight = 0;
  svgPaths: any[] = [];
  deletedPaths: any[] = [];
  startDraw = false;
  pathCss = {
    strokeColor:'#333333',
    strokeWidth:'5px'
  }
  pointCount = 1;
  path = '';

  @ViewChild('board') board: ElementRef = new ElementRef(null);
  @ViewChild('svg') svgElem: ElementRef = new ElementRef(null);
  @ViewChild('color') colorPicker: ElementRef = new ElementRef(null);

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.newDraw.subscribe((draw:any[]) => {
      if (draw) {
        this.svgPaths = draw
      }
    })
  }

  prepareDrawing($event: MouseEvent) {
    let pathD = `M${$event.offsetX},${$event.offsetY},L${$event.offsetX},${$event.offsetY}`;
    this.svgPaths.push({path:pathD,strokeColor:this.pathCss.strokeColor,strokeWidth:this.pathCss.strokeWidth});
    this.pointCount = 1;
    this.path = '';
    this.startDraw = true;
  }

  stopDrawing($event: MouseEvent) {
    this.startDraw = false;
    let i = this.svgPaths.length - 1;
    if (this.pointCount < 3 && this.pointCount > 1) {
      for (let j = this.pointCount; j <= 3; j++) {
        this.path += `,${$event.offsetX},${$event.offsetY}`;
      }
      this.svgPaths[i].path = this.path;
    }
    this.socketService.draw(this.svgPaths)
  }



  startDrawing($event: MouseEvent) {
    if (!this.startDraw) return;
    let i = this.svgPaths.length - 1;
    if (this.pointCount === 1) {
      this.path = this.svgPaths[i].path;
      this.path += `,C${$event.offsetX},${$event.offsetY}`;
      this.pointCount += 1;
    } else if (this.pointCount <= 3) {
      this.path += `,${$event.offsetX},${$event.offsetY}`;
      this.pointCount += 1;
    } else if (this.pointCount > 3) {
      this.pointCount = 1;
      this.svgPaths[i].path = this.path;
      this.path = '';
    }
  }

  saveImage($event: MouseEvent) {
    $event.preventDefault();
    this.triggerDownload("data:image/svg+xml;charset=utf-8,"
        + encodeURIComponent(
            new XMLSerializer().serializeToString(this.svgElem.nativeElement)),'image.svg')
  }
  triggerDownload(imgURI: any, fileName: any){
    let a = document.createElement('a')
    a.setAttribute('download', fileName)
    a.setAttribute('href', imgURI)
    a.setAttribute('target', '_blank')
    a.click()
    a.remove();
  }


  changeColor($event: Event) {
    const color = this.colorPicker.nativeElement.value;
    this.pathCss.strokeColor = color;
  }

  undoBoard($event: MouseEvent) {
    $event.preventDefault();
    if(this.svgPaths.length<=0) return;
    const i = this.svgPaths.length - 1;
    this.deletedPaths.push(this.svgPaths[i])
    this.svgPaths.splice(i,1);
  }
  redoBoard($event: MouseEvent) {
    $event.preventDefault();
    if(this.deletedPaths.length<=0) return;
    const i = this.deletedPaths.length - 1;
    this.svgPaths.push(this.deletedPaths[i])
    this.deletedPaths.splice(i,1);
  }
}
