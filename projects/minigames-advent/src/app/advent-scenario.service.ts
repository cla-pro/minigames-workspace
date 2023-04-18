import { Injectable } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioWordle } from './shared/advent-scenario.model';

@Injectable({
  providedIn: 'root'
})
export class AdventScenarioService {
  private adventPrefix: string = "advent_";

  constructor() {}

  loadScenarios(): AdventScenario[] {
    return Object.keys(localStorage)
      .filter(k => k.search('_id') > -1)
      .sort()
      .map(k => localStorage.getItem(k))
      .map(k => this.loadScenario(k!));;
  }

  private loadScenario(id: string): AdventScenario {
    let type = localStorage.getItem(id + "_type");
    if (type === "wordle") {
      return this.loadScenarioWordle(id);
    } else if (type === "memory") {
      return this.loadScenarioMemory(id);
    } else if (type === "parkingjam") {
      return this.loadScenarioParkingjam(id);
    } else {
      throw new Error('Unknown scenario type: ' + type);
    }
  }

  loadScenarioWordle(id: string): AdventScenarioWordle {
    let word = localStorage.getItem(id + "_word");
    return this.loadScenarioStatus(new AdventScenarioWordle(id, (word) ? word : ""));
  }

  loadScenarioMemory(id: string): AdventScenarioMemory {
    let width = this.parseIntOrDefault(localStorage.getItem(id + "_width"), 0);
    let height = this.parseIntOrDefault(localStorage.getItem(id + "_height"), 0);
    return this.loadScenarioStatus(new AdventScenarioMemory(id, width, height));
  }

  loadScenarioParkingjam(id: string): AdventScenarioParkingjam {
    return this.loadScenarioStatus(new AdventScenarioParkingjam(id));
  }

  private loadScenarioStatus<T extends AdventScenario>(scenario: T): T {
    scenario.completed = this.parseBooleanOrDefault(localStorage.getItem(scenario.prefix + "_completed"), false);
    scenario.bonus = this.parseBooleanOrDefault(localStorage.getItem(scenario.prefix + "_bonus"), false);
    console.log("Scenario " + scenario.prefix + " -> " + scenario.completed + ", " + scenario.bonus);
    return scenario;
  }

  saveScoreStatus(scenario: AdventScenario): void {
    localStorage.setItem(scenario.prefix + "_completed", `${scenario.completed}`);
    localStorage.setItem(scenario.prefix + "_bonus", `${scenario.bonus}`);
  }

  saveScenarios(scenarios: AdventScenario[]): void {
    scenarios
      .filter(s => this.isNotSaved(s))
      .forEach(s => {
        let id = s.prefix;
        localStorage.setItem(id + "_id", id);
        localStorage.setItem(id + "_type", s.type);
        localStorage.setItem(id + "_completed", `${s.completed}`);
        localStorage.setItem(id + "_bonus", `${s.bonus}`);

        if (s instanceof AdventScenarioWordle) {
          this.saveScenarioWordle(id, s as AdventScenarioWordle);
        } else if (s instanceof AdventScenarioMemory) {
          this.saveScenarioMemory(id, s as AdventScenarioMemory);
        } else if (s instanceof AdventScenarioWordle) {
          this.saveScenarioParkingjam(id, s as AdventScenarioParkingjam);
        }
      });
  }

  private isNotSaved(scenario: AdventScenario): boolean {
    return localStorage.getItem(scenario.prefix + "_id") === null;
  }

  private saveScenarioWordle(id: string, scenario: AdventScenarioWordle) {
    localStorage.setItem(id + "_word", scenario.word);
  }

  private saveScenarioMemory(id: string, scenario: AdventScenarioMemory) {
    localStorage.setItem(id + "_width", '' + scenario.width);
    localStorage.setItem(id + "_height", '' + scenario.height);
  }

  private saveScenarioParkingjam(id: string, scenario: AdventScenarioParkingjam) {
    
  }

  private parseIntOrDefault(text: string | null, defaultValue: number): number {
    return (text) ? parseInt(text) : defaultValue;
  }

  private parseBooleanOrDefault(text: string | null, defaultValue: boolean): boolean {
    return (text) ? text === "true" : defaultValue;
  }
}
