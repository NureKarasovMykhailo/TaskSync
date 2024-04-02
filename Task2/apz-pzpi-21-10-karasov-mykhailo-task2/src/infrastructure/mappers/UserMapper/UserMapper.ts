import IMapper from "../IMapper";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";

export default class UserMapper implements IMapper<User, UserDomainModel> {

    toDomainModel(data: User): UserDomainModel {

        return new UserDomainModel(
            data.id,
            data.email,
            data.firstName,
            data.secondName,
            data.password,
            data.phoneNumber,
            data.birthday,
            data.userImage,
            data.companyId,
        );
    }

    toPersistenceModel(data: UserDomainModel): User {
        const user = new User();

        user.id = data.id;
        user.userImage = data.userImage;
        user.birthday = data.birthday;
        user.phoneNumber = data.phoneNumber;
        user.password = data.password;
        user.secondName = data.secondName;
        user.firstName = data.firstName;
        user.email = data.email;
        user.companyId = data.companyId


        return user;
    }

}