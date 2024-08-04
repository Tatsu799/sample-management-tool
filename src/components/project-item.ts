import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Component } from './base-component';
import { Autobind } from '../decorators/autobind';

//ProjectItem Class　リストのアイテムを表示する
export class ProjectItem extends Component<HTMLUListElement, HTMLElement> implements Draggable {
  private project: Project;

  //ゲッター関数
  get manday() {
    if (this.project.manday < 20) {
      return this.project.manday.toString() + '人月';
    } else {
      return (this.project.manday / 20).toString() + '人月';
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('test/plain', this.project.id); //dataTransfer(ドラッグイベント特有のプロパティ)
    event.dataTransfer!.effectAllowed = 'move'; // effectAllowed(ブラウザ上でカーソルがどのように表示するかの設定)
  }

  dragEndHandler(_event: DragEvent): void {
    console.log('Drag終了');
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.manday;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
