describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      const root = {
        name: 'Superuser',
        username: 'root',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', root)
      cy.login({ username: root.username, password: root.password })
      const blogs = [{
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 5
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10
      }]
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    const blog = {
      title: 'Type wars Robert C. Martin',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()

      cy.contains(blog.title)
    })

    it('user can like a blog', function () {
      cy.createBlog(blog)
      cy.contains(blog.title).parent().as('theBlog')
      cy.get('@theBlog').contains('view').click()
      cy.get('@theBlog').contains('like').click()
      cy.get('@theBlog').get('.likes').should('contain', '1')
    })

    describe('Delete', function () {
      it('user who created a blog can delete it', function () {
        cy.createBlog(blog)
        cy.contains(blog.title).parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove')
      })

      it('user who did not created a blog can not delete it', function () {
        cy.contains('React patterns Michael Chan').parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').should('not.contain', 'remove')
      })
    })

    describe('Orderd', function () {
      it.only('blogs are ordered according to likes', function () {
        cy.createBlog(blog)
        cy
          .get('.blog_hide').then( blogs => {
            cy.wrap(blogs[0]).contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
            cy.wrap(blogs[1]).contains('React patterns Michael Chan')
            cy.wrap(blogs[2]).contains('Type wars Robert C. Martin Robert C. Martin')
          })
      })
    })
  })
})