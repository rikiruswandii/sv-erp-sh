import * as user from '$lib/server/user';
import { useInitials } from '$lib/hooks/useInitials';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [users, sessions, projects, tasks] = await Promise.all([
    user.getAllUsers(),
    user.getSessions(),
    user.getProjects(),
    user.getTasks()
  ]);

  const sessionMap = Object.groupBy(sessions, s => s.userId);
const projectMap = Object.groupBy(projects, p => p.userId);
const taskMap = Object.groupBy(tasks, t => t.userId);

const allUserWithData = users.map((u) => ({
  ...u,
  initials: useInitials(u.name),
  sessions: sessionMap[u.id] ?? [],
  projects: projectMap[u.id] ?? [],
  tasks: taskMap[u.id] ?? [],
}));


  return {
    allUser: allUserWithData,
    countAllUser: users.length,
  };
};
