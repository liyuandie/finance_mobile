import { postApi, getApi } from './';

// 获取调查问卷
export function getQuestionnaire(params) {
  const { mobile, ticket } = params;
  return getApi('/user/questionnaire/contest', {
    mobile,
    ticket
  });
}

// 提交上传分数
export function submitScore(params) {
  const { mobile, ticket, score } = params;
  return postApi('/user/questionnaire/score', {
    mobile,
    ticket,
    score
  });
}
