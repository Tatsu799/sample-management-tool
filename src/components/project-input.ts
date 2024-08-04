import { Component } from './base-component';
import { Validatable, validation } from '../util/validation';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectInput Class　入力を受け取るクラス
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  titleDescriptionElement: HTMLInputElement;
  titleMandayElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.titleDescriptionElement = this.element.querySelector('#description') as HTMLInputElement;
    this.titleMandayElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
  }

  public configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  public renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterdDescription = this.titleDescriptionElement.value;
    const enterdManday = this.titleMandayElement.value;

    const titleVlidatable: Validatable = {
      value: enterdTitle,
      required: true,
    };

    const descriptionVlidatable: Validatable = {
      value: enterdDescription,
      required: true,
      minLength: 5,
    };

    const mandayVlidatable: Validatable = {
      value: +enterdManday,
      required: true,
      min: 1,
      max: 100,
    };

    if (!validation(titleVlidatable) || !validation(descriptionVlidatable) || !validation(mandayVlidatable)) {
      alert('エラーです');
      return;
    } else {
      return [enterdTitle, enterdDescription, +enterdManday];
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.titleDescriptionElement.value = '';
    this.titleMandayElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      this.clearInput();
    }
  }
}
