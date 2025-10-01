const delay = (result, time = 400) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(result), time);
  });

const users = [
  {
    id: 'admin-1',
    email: 'admin@desk.com',
    password: 'admin123',
    role: 'admin',
    name: 'Aisha Khan',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 'employee-1',
    email: 'employee@desk.com',
    password: 'employee123',
    role: 'employee',
    name: 'Ravi Patel',
    avatar: 'https://i.pravatar.cc/150?img=33'
  }
];

const tickets = [
  {
    id: 'TCK-1001',
    subject: 'Laptop screen flickering',
    requester: 'Ravi Patel',
    department: 'IT Support',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2024-03-01'
  },
  {
    id: 'TCK-1002',
    subject: 'VPN access request',
    requester: 'Aisha Khan',
    department: 'Infrastructure',
    status: 'Open',
    priority: 'Medium',
    createdAt: '2024-03-02'
  },
  {
    id: 'TCK-1003',
    subject: 'New employee onboarding',
    requester: 'HR Team',
    department: 'Human Resources',
    status: 'Closed',
    priority: 'Low',
    createdAt: '2024-02-25'
  }
];

const departments = [
  {
    id: 'dept-it',
    name: 'Information Technology',
    lead: 'Rahul Verma',
    subDepartments: [
      {
        id: 'dept-it-support',
        name: 'IT Support',
        employees: ['Ravi Patel', 'Aditi Sharma']
      },
      {
        id: 'dept-it-infra',
        name: 'Infrastructure',
        employees: ['Sanjay Kumar', 'Priya Nair']
      }
    ]
  },
  {
    id: 'dept-hr',
    name: 'Human Resources',
    lead: 'Sneha Kapoor',
    subDepartments: [
      {
        id: 'dept-hr-recruitment',
        name: 'Recruitment',
        employees: ['Anjali Menon', 'Rohit Singh']
      },
      {
        id: 'dept-hr-payroll',
        name: 'Payroll',
        employees: ['Kiran Rao']
      }
    ]
  }
];

export function createApiClient() {
  return {
    auth: {
      async signIn({ email, password }) {
        const user = users.find((item) => item.email === email && item.password === password);
        if (!user) {
          throw new Error('Invalid credentials. Try admin@desk.com or employee@desk.com');
        }
        const { password: _password, ...profile } = user;
        return delay(profile);
      }
    },
    tickets: {
      async list() {
        return delay([...tickets]);
      },
      async listByUser(role) {
        if (role === 'admin') {
          return delay([...tickets]);
        }
        return delay(tickets.filter((ticket) => ticket.requester === 'Ravi Patel'));
      },
      async create(ticket) {
        const newTicket = {
          ...ticket,
          id: `TCK-${Math.floor(Math.random() * 9000) + 1000}`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        tickets.push(newTicket);
        return delay(newTicket);
      }
    },
    team: {
      async listDepartments() {
        return delay([...departments]);
      }
    },
    dashboard: {
      async summary(role) {
        const base = {
          openTickets: tickets.filter((ticket) => ticket.status !== 'Closed').length,
          closedTickets: tickets.filter((ticket) => ticket.status === 'Closed').length,
          avgResponse: '3h 45m',
          satisfaction: 92
        };
        if (role === 'admin') {
          return delay({
            ...base,
            teamCount: departments.reduce((count, dept) => count + dept.subDepartments.length, 0),
            employeeCount: departments.reduce(
              (count, dept) =>
                count + dept.subDepartments.reduce((sum, sub) => sum + sub.employees.length, 0),
              0
            )
          });
        }
        return delay({
          ...base,
          teamCount: 2,
          employeeCount: 12
        });
      }
    }
  };
}
