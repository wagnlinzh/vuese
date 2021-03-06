module.exports = options => {
  const { title, components, markdownDir } = options
  const groupsObjs = {}
  const groups = []
  components.forEach(c => {
    const res = {
      title: c.compName,
      link: '/' + markdownDir + '/' + c.compName
    }
    if (groupsObjs[c.groupName]) {
      groupsObjs[c.groupName].push(res)
    } else {
      groupsObjs[c.groupName] = [res]
    }
  })
  Object.keys(groupsObjs).forEach(name => {
    groups.push({
      title: name,
      links: groupsObjs[name].sort((a, b) => (a.name > b.name ? 1 : -1))
    })
  })
  groups.sort((a, b) => {
    if (a.title === '') return -1
    if (b.title === '') return 1
    return a.name > b.name ? 1 : -1
  })
  const config = {
    data(answers) {
      return {
        title: title || answers.title,
        groupsStr: JSON.stringify(groups),
        markdownDir
      }
    }
  }
  if (!title)
    config.prompts = {
      title: {
        type: 'input',
        message: 'Sidbar title:',
        default: 'Components'
      }
    }
  return config
}
