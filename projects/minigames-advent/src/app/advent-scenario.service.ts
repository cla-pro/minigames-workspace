import { Injectable } from '@angular/core';
import { AdventScenario, AdventScenarioMemory, AdventScenarioParkingjam, AdventScenarioWordle } from './shared/advent-scenario.model';

@Injectable({
  providedIn: 'root'
})
export class AdventScenarioService {

  constructor() {}

  loadScenarioWordle(id: string): AdventScenarioWordle {
    let word = localStorage.getItem(id + "_word");
    return new AdventScenarioWordle(id, (word) ? word : "");
  }

  loadScenarioMemory(id: string): AdventScenarioMemory {
    let width = this.parseIntOrDefault(localStorage.getItem(id + "_width"), 0);
    let height = this.parseIntOrDefault(localStorage.getItem(id + "_height"), 0);
    return new AdventScenarioMemory(id, width, height);
  }

  loadScenarioParkingjam(id: string): AdventScenarioParkingjam {
    return new AdventScenarioParkingjam(id);
  }

  saveScenarios(scenarios: AdventScenario[]): void {
    scenarios
      .filter(s => this.isNotSaved(s))
      .forEach(s => {
        let id = s.prefix;
        console.log("Storing scenario " + id);
        localStorage.setItem(id + "_id", id);
        localStorage.setItem(id + "_type", s.type);

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
}
