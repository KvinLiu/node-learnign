const users = [
	{
		id: 1,
		name: 'Andrew',
		schoolId: 101
	},
	{
		id: 2,
		name: 'Jessica',
		schoolId: 99
	}
];
const grades = [
	{
		id: 1,
		schoolId: 101,
		grade: 86
	},
	{
		id: 2,
		schoolId: 999,
		grade: 100
	},
	{
		id: 3,
		schoolId: 101,
		grade: 80
	}
];

const getUser = (id) => {
	return new Promise((resolve, reject) => {
		const user = users.find((user) => user.id === id);
		if (user) {
			resolve(user);
		} else {
			reject(`Unable to find user with id of ${id}.`)
		}
	});
};

const getGrades = (schoolId) => {
	return new Promise((resolve, reject) => {
		resolve(grades.filter((grade) => grade.schoolId = schoolId));
	});
};

// Andrew has a 83% in the class
const getStatus = (userId) => {
	let user;
	return getUser(userId).then((tempUser) => {
		user = tempUser;
		return getGrades(user.schoolId);
	}).then((grades) => {
		// averages
		let average = 0;
		// return our string
		if (grades.length > 0) {
			average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
		}
		return `${user.name} has a ${average} in the class.`;
	})
};

// async await

// () => {
// 	return new Promise((resolve, reject) => {
//   if () {
// 	  resolve('Mike')
//   }	else {
// 	  reject('This is an error')
//   }
//
// 	})
// }

const getStatusAlt = async (userId) => {
	// throw new Error('This is an error');
	// return 'Mike';
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);

	let average = 0;
	if (grades.length > 0) {
		average = grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length;
	}
	return `${user.name} has a ${average} in the class.`;
};

getStatusAlt(1).then((name) => {
	console.log(name)
}).catch((e) => {
	console.log(e);
});

// getStatus(2).then((status) => {
// 	console.log(status);
// }).catch((e) => {
// 	console.log(e);
// });

// getUser(21).then((user) => {
// 	console.log(user);
// }).catch((e) => {
// 	console.log(e);
// });
//
// getGrades(101).then((grade) => {
// 	console.log(grade);
// }).catch((e) => {
// 	console.log(e);
// });
