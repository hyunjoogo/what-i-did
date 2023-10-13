import { ActionPlans, CurrentActionInfo, EssentialCurrentAction } from '../types/action';
import { RequestActionPlans, ResponseActionPlans } from '../types/storage';

const localStorageManager = {
  CURRENT_ACTION: 'currentAction',
  ACTION_PLANS: 'actionPlans',
  get currentAction(): CurrentActionInfo {
    return JSON.parse(localStorage.getItem(this.CURRENT_ACTION)!);
  },

  get actionPlans(): ActionPlans {
    return JSON.parse(localStorage.getItem(this.ACTION_PLANS)!);
  },

  setCurrentAction(essentialCurrentAction: EssentialCurrentAction) {
    const startTimestamp = Date.now();
    const endTimestamp = startTimestamp + essentialCurrentAction.duringTime * 60 * 1000;
    const currentAction = {
      startTimestamp: startTimestamp,
      endTimestamp: endTimestamp,
      ...essentialCurrentAction,
    };
    localStorage.setItem(this.CURRENT_ACTION, JSON.stringify(currentAction));
  },

  setNewEndTimestampOfCurrentAction(leftSeconds: number) {
    const prev = this.currentAction;
    const newEndTimestamp = Date.now() + leftSeconds * 1000;
    const newCurrentAction = {
      ...prev,
      endTimestamp: newEndTimestamp,
    };
    this.setCurrentAction(newCurrentAction);
  },

  createNewActionPlans(memo: RequestActionPlans, { whatIWill, ...planInfo }: CurrentActionInfo) {
    const actionPlans: ActionPlans = {
      actorName: '이름',
      plans: [
        {
          id: planInfo.startTimestamp,
          whatIWill: whatIWill,
          memo: memo,
          name: '',
          whatIDid: '',
          whatILearned: '',
          summary: '',
          isDone: false,
          info: planInfo,
        },
      ],
    };
    localStorage.setItem(this.ACTION_PLANS, JSON.stringify(actionPlans));
  },

  setActionPlans(memo: RequestActionPlans) {
    const localActionPlans = localStorage.getItem(this.ACTION_PLANS);
    const { whatIWill, ...planInfo } = this.currentAction;
    if (localActionPlans === null) {
      return this.createNewActionPlans(memo, { whatIWill, ...planInfo });
    }
    const actionPlans: ResponseActionPlans = JSON.parse(localActionPlans);
    actionPlans.plans.push({
      id: planInfo.startTimestamp,
      whatIWill: whatIWill,
      memo: memo,
      name: '',
      whatIDid: '',
      whatILearned: '',
      summary: '',
      isDone: false,
      info: planInfo,
    });
    localStorage.setItem(this.ACTION_PLANS, JSON.stringify(actionPlans));
  },
};

export default localStorageManager;
