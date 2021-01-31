import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, hasOne, HasOne, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Invoice from 'App/Models/Invoice'
import AlertBoxConfiguration from 'App/Models/AlertBoxConfiguration'
import Wallet from 'App/Models/Wallet'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public uniqueUuid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => AlertBoxConfiguration)
  public alertBoxConfigurations: HasMany<typeof AlertBoxConfiguration>

  @hasMany(() => Invoice)
  public invoices: HasMany<typeof Invoice>

  @hasOne(() => Wallet)
  public wallet: HasOne<typeof Wallet>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
