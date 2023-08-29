import { Ok, Err } from './index'

describe('Result', () => {

  describe('Ok', () => {

    describe('match', () => {
      it('should execute ok callback', () => {
        // Arrange
        const value = 0
          , result = Ok(value)

        // Act
        const matchedValue = result.match(v => v, _ => value + 1)

        // Assert
        expect(matchedValue).toBe(value)
      })
    })

    describe('getValueOrDefault', () => {
      it('should return contained value', () => {
        // Arrange
        const value = 0
          , defaultValue = value + 1
          , result = Ok(value)

        // Act
        const returnedValue = result.getValueOrDefault(defaultValue)

        // Assert
        expect(returnedValue).toBe(value)
      })
    })

    describe('getValueOrCompute', () => {
      it('should return contained value', () => {
        // Arrange
        const value = 0
          , result = Ok(value)

        // Act
        const returnedValue = result.getValueOrCompute(_ => value + 1)

        // Assert
        expect(returnedValue).toBe(value)
      })
    })

    describe('map', () => {
      it('should transform contained value', () => {
        // Arrange
        const value = 0
          , mappedValue = value + 1
          , result = Ok(value)

        // Act
        const mappedResult = result.map(_ => mappedValue)

        // Assert
        expect(mappedResult.match(v => v, _ => mappedValue + 1)).toBe(mappedValue)
      })
    })

    describe('mapErr', () => {
      it('should return itself', () => {
        // Arrange
        const value = 0
          , result = Ok(value)

        // Act
        const mappedResult = result.mapErr(e => `Modified: ${e}`)

        // Assert
        expect(mappedResult).toBe(result)
      })

      it('should not affect Ok value', () => {
        // Arrange
        const value = 0
          , result = Ok(value)

        // Act
        const mappedResult = result.mapErr(e => `Modified: ${e}`)

        // Assert
        expect(mappedResult.getValueOrDefault(value + 1)).toBe(value)
      })
    })

    describe('and', () => {
      it('should return the next Result', () => {
        // Arrange
        const value = 0
          , result = Ok(value)
          , nextResult = Ok(10)

        // Act
        const andResult = result.and(nextResult)

        // Assert
        expect(andResult).toBe(nextResult)
      })
    })

    describe('andThen', () => {
      it('should return a new Result produced by provided function', () => {
        // Arrange
        const result = Ok(0)
          , nextResult = Ok(0)

        // Act
        const andThenResult = result.andThen(_ => nextResult)

        // Assert
        expect(andThenResult).toBe(nextResult)
      })
    })

    describe('or', () => {
      it('should return itself', () => {
        // Arrange
        const result = Ok(0)
          , alternate = Ok(0)

        // Act
        const orResult = result.or(alternate)

        // Assert
        expect(orResult).toBe(result)
      })
    })

    describe('orElse', () => {
      it('should return itself', () => {
        // Arrange
        const result = Ok(0)

        // Act
        const orElseResult = result.orElse(_ => Ok(0))

        // Assert
        expect(orElseResult).toBe(result)
      })
    })

    describe('isOk', () => {
      it('should be true for Ok', () => {
        // Arrange
        const result = Ok(0)

        // Act & Assert
        expect(result.isOk).toBe(true)
      })
    })

    describe('isErr', () => {
      it('should be false for Ok', () => {
        // Arrange
        const result = Ok(0)

        // Act & Assert
        expect(result.isErr).toBe(false)
      })
    })

  })

  describe('Err', () => {

    describe('match', () => {
      it('should execute err callback', () => {
        // Arrange
        const error = ''
          , ok = 'ok'
          , result = Err(error)

        // Act
        const matchedValue = result.match(_ => ok, e => e)

        // Assert
        expect(matchedValue).toBe(error)
      })
    })

    describe('getValueOrDefault', () => {
      it('should return default value', () => {
        // Arrange
        const error = ''
          , defaultValue = 0
          , result = Err(error)

        // Act
        const returnedValue = result.getValueOrDefault(defaultValue)

        // Assert
        expect(returnedValue).toBe(defaultValue)
      })
    })

    describe('getValueOrCompute', () => {
      it('should return computed value', () => {
        // Arrange
        const error = ''
          , result = Err(error)

        // Act
        const returnedValue = result.getValueOrCompute(e => e.length)

        // Assert
        expect(returnedValue).toBe(error.length)
      })
    })

    describe('map', () => {
      it('should return itself', () => {
        // Arrange
        const error = ''
          , result = Err(error)

        // Act
        const mappedResult = result.map(_ => 0)

        // Assert
        expect(mappedResult).toBe(result)
      })

      it('should not affect Err value', () => {
        // Arrange
        const error = ''
          , result = Err(error)

        // Act
        const mappedResult = result.map(_ => 0)

        // Assert        
        expect(mappedResult.match(_ => error + '!', e => e)).toBe(error)
      })
    })

    describe('mapErr', () => {
      it('should transform contained error', () => {
        // Arrange
        const error = ''
          , result = Err(error)

        // Act
        const mappedResult = result.mapErr(e => `Modified: ${e}`)

        // Assert
        expect(mappedResult.match(_ => _, e => e)).toBe(`Modified: ${error}`)
      })
    })

    describe('and', () => {
      it('should return itself', () => {
        // Arrange
        const error = ''
          , result = Err(error)
          , nextResult = Ok(0)

        // Act
        const andResult = result.and(nextResult)

        // Assert
        expect(andResult).toBe(result)
      })
    })

    describe('andThen', () => {
      it('should return itself', () => {
        // Arrange
        const error = ''
          , result = Err(error)

        // Act
        const andThenResult = result.andThen(_ => Ok(0))

        // Assert
        expect(andThenResult).toBe(result)
      })
    })

    describe('or', () => {
      it('should return the alternate Result', () => {
        // Arrange
        const error = ''
          , result = Err(error)
          , alternate = Ok(0)

        // Act
        const orResult = result.or(alternate)

        // Assert
        expect(orResult).toBe(alternate)
      })
    })

    describe('orElse', () => {
      it('should return a new Result produced by provided function', () => {
        // Arrange
        const error = ''
          , result = Err(error)
          , newResult = Ok(0)

        // Act
        const orElseResult = result.orElse(_ => newResult)

        // Assert
        expect(orElseResult).toBe(newResult)
      })
    })

    describe('isOk', () => {
      it('should be false for Err', () => {
        // Arrange
        const result = Err('')

        // Act & Assert
        expect(result.isOk).toBe(false)
      })
    })

    describe('isErr', () => {
      it('should be true for Err', () => {
        // Arrange
        const result = Err('')

        // Act & Assert
        expect(result.isErr).toBe(true)
      })
    })

  })
})